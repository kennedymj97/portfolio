---
title: "Polymorphism in Rust: Enums vs Traits"
date: "2020-12-11T22:40:12Z"
---

Why I now default to using enums to implement polymorphism is Rust.

<!-- more -->

When I started with Rust I defaulted to using traits, which reminded of typeclasses in Haskell, for polymorphism. Unlike Haskell, Rust requires knowing how much space to allocate for the value of types. This introduces some complications which can make traits a pain to work with.

This post discusses the use of enums and traits for polymorphism in Rust and why I now tend to favour using enums.

## Polymorphism with Traits

For those unfamiliar with the term, polymorphism is providing a single interface (group of functions) for multiple different types. A common example, used in this post, are shapes. Each shape can be considered it's own type, however, will implement many of the same functions as other shapes.

A trait in Rust defines an interface. Types that implement this interface must implement all the functions defined. For example, a trait `Shape` can be created which defines the type of a function `area`. The `Rectangle`, `Circle` and `RightAngleTriangle` shapes are created using structs. Each of these shapes then implements our `Shape` trait, meaning the function `area` must be defined.

```rust
trait Shape {
    fn area(&self) -> f64;
}

struct Rectangle {
    height: f64,
    width: f64,
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }
}

struct Circle {
    radius: f64,
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius.powi(2)
    }
}

struct RightAngleTriangle {
    base: f64,
    height: f64,
}

impl Shape for RightAngleTriangle {
    fn area(&self) -> f64 {
        0.5 * self.base * self.height
    }
}
```

## Polymorphism with Enums

Enums in Rust are different from those in most other languages. The variants of the enums can contain data, making them algebraic data types. To reproduce the shapes example used previously, an enum `Shape` is created. Each variant of this enum will be a different shape. Polymorphism can be implemented by adding methods to the enum. Enum methods require an implementation for each of the variants, which is done using pattern matching.

```rust
enum Shape {
    Rectangle { width: f64, height: f64 },
    Circle { radius: f64 },
    RightAngleTriangle { base: f64, height: f64 },
}

impl Shape {
	fn area(&self) -> f64 {
    	match self {
            Shape::Rectangle { width, height } => 
                width * height,
            Shape::Circle { radius } => 
                std::f64::consts::PI * radius.powi(2),
            Shape::RightAngleTriangle { base, height } => 
                0.5 * base * height,
        }
    }
}
```

## Using Traits and Enums
There are a couple of ways of using traits: generics and trait objects. The difference between these is that generics use static dispatch whereas trait objects use dynamic dispatch [\[1\]](#references). For generics the compiler will generate a unique function for each of the types that implement the trait. Consider the `print_area` function below, the compiler would actually produce 3 individual functions, one for each of the shapes we implemented.

```rust
fn print_area<S: Shape>(shape: S) {
    println!("{}", shape.area());
}
```

Static dispatch has the problem that you can only use the type that the function has been compiled for in the function, making some data structures, like a vector that contains elements that implement the trait impossible. Dynamic dispatch, used by trait objects, makes using multiple different types in the same data structure possible.

```rust
// This only works if every element in the vector is 
// the same shape. Not the behaviour we want!
fn sum_areas<S: Shape>(shapes: Vec<S>) -> f64 {}

// With trait objects multiple different shapes can 
// be contained in the vector.
fn sum_areas(shapes: Vec<Box<dyn Shape>>) -> f64 {
    shapes.iter().fold(0., |acc, shape| {
        acc + shape.area()
    })
}
```

There are some constraints when using dynamic dispatch caused by Rust not knowing the size of the trait object. The trait objects must be put behind a reference and the trait must conform to object safety rules. For example, say we wanted to clone the vector of shapes. To use clone we need to guarantee that our shapes derive `Clone`, which can be done using a subtrait, but if we try to do this we can no longer use this trait as a trait object because the trait now breaks object safety rules.

```rust
fn sum_areas(shapes: Vec<Box<dyn Shape>>) -> f64 {
    // To use clone need to use a subtrait to guarantee 
    // shapes implement Clone
    let cloned_shapes = shapes.clone();
    cloned_shapes.iter().fold(0., |acc, shape| {
        acc + shape.area()
    })
}

// This violates object safety constraits so the Shape
// trait can no longer be used as a trait object.
trait Shape: Clone {
    ...
}
```

There are workarounds to be able to clone trait objects [\[2\]](#references), but they do not feel natural and I avoid them if possible.
 
Enums can do everything a trait object would but the size of the enum is known and static dispatch used. Allowing data structures that contain different shapes, without having to worry about putting the type behind a reference and object safety rules. Consider the previous example, one can simply derive clone for the enum and then implement the function, without any complaints from Rust.

```rust
#[derive(Clone)]
enum Shape {
    ...
}

fn sum_areas(shapes: Vec<Shape>) -> f64 {
    let cloned_shapes = shapes.clone();
    cloned_shapes.iter().fold(0., |acc, shape| {
        acc + shape.area()
    })
}
```

*Note: the amount of space an enum will use is equal to it's largest variant. If one of the variants takes up a lot of space, one should consider putting it behind a reference.*

## When to Use Enums or Traits
Currently I default to using enums for polymorphic behaviour as they get all of the benefits of trait objects without having to deal with the issues caused by dynamic dispatch.

There are still a couple of cases in which I use traits. The main reason is if I want external code to be able to add types, which enums do not allow. I also consider using traits if the behaviour is particularly generic, such that the interface I am defining is not determined by the types that implement it. In this case I am confident I will not be using the types that implement the trait as trait objects so do not run into the issues caused by dynamic dispatch. For example, even if only used in the same module, one would not implement `Clone` as an enum. Finding such generic behaviour is rare however.

Some people argue that enums produce ugly code with methods that are long and hard to read and hence favour using traits. I disagree, if the methods start to get too long one can extract the logic into separate functions, even grouping these functions into a module if there a large number of methods. In fact, I think this makes the code easier to read. The methods can be used as a table of contents allowing one to view the logic by jumping to the function definitions, rather than have to search through the code for the individual types.

One gripe I have with enums is that the variants are not considered types in their own right, meaning one cannot create functions that only work with an individual variant from the enum. This can be solved by creating the types using structs and wrapping them in an enum, but it would be nice to not have to do this. An example is [the standard libraries implementation for IP addresses](https://doc.rust-lang.org/std/net/enum.IpAddr.html).

## Summary

In the majority of cases I need polymorphism I now use enums. I tend to only use traits if I want to allow external code to be able to add types or it is clear that the behaviour is particularly generic and is not determined by the types. If I do use traits then I always favour using generics over trait objects. Trait objects should only be used when absolutely necessary due to the complications caused by dynamic dispatch.

## References

1. [The Rust Programming Language Book - Trait Objects Perform Dynamic Dispatch](https://doc.rust-lang.org/book/ch17-02-trait-objects.html#trait-objects-perform-dynamic-dispatch)
2. [Rust forums - Is it possible to clone a boxed trait object?](https://users.rust-lang.org/t/solved-is-it-possible-to-clone-a-boxed-trait-object/1714/6)

## Further Reading
- [The Rust Programming Language Book - Enums and Pattern Matching](https://doc.rust-lang.org/book/ch06-00-enums.html)
- [The Rust Programming Language Book - Traits: Defining Shared Behaviour](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [The Rust Programming Language Book - Using Trait Objects That Allow for Values of Different Types](https://doc.rust-lang.org/book/ch17-02-trait-objects.html)
- [The Rust RFC Book - Object Safety](https://rust-lang.github.io/rfcs/0255-object-safety.html)
