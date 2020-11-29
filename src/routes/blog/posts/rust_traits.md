---
title: "Polymorphism in Rust: Enums vs Traits"
date: "2020-11-29T13:29:37Z"
---

Why I now default to using enums to implement polymorphism is Rust.

<!-- more -->

Polymorphism is the term used to describe implementing the same set of functions for multiple different types/objects. A common example is shapes. Each shape can be considered its own type, however will likely implement the same functions as other shapes.

It is clear that the Rust team took inspiration from functional languages. Rust's enums are algebraic data types which I am familiar with from Haskell and Rust's traits are very similar to Haskell's typeclasses. Typeclasses are the natural way of implementing polymorphism in Haskell. As such, when I started with Rust I defaulted to using traits for polymorphism. Rust is different from Haskell in that it is a low-level language that focuses on performance and therefore requires knowing how much space to allocate for the value of types. This introduces some complications which can make traits a pain to work with. Because of this I now default to using enums for polymorphism.

This post aims to briefly summarise the use of enums and traits in Rust and why I now tend to favour using enums.

## Polymorphism with Traits and Enums

Traits are implemented in Rust as followed. We create our trait `Shape` which defines the type of function `area`. We then create 3 shapes: `Rectangle`, `Circle` and `RightAngleTriangle` using structs. Each of these shapes then implements our `Shape` trait, meaning they are required to implement the `area` function.

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

Enums in Rust are different from enums in languages you may be familiar with. They are much more similar to algebraic data types from functional programming. The variants of the enums can themselves contain data. The enum equivalent of our trait example is as follows. The one difference with this implementation is that a external code is not able to add their own `Shape`. If one was using traits then external code is able to create a new type and implement the `Shape` trait.

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

## Using traits and enums
There are a couple of ways of using traits: generics and trait objects. The difference between these is that generics use static dispatch whereas trait objects use dynamic dispatch [\[1\]](#references). For generics the compiler will generate a unique function for each of the types that implement the trait. Consider the `print_area` below, the compiler would actually produce 3 individual functions, one for each of the shapes we implemented.

```rust
fn print_area<S: Shape>(shape: S) {
    println!("{}", shape.area());
}
```

Static dispatch has the problem that you can only use the type that the function has been compiled for, making some data structures, like a vector that contains elements that implement the trait impossible. Dynamic dispatch, used by trait objects, makes using multiple different types in the same data structure possible.

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

There are some annoyances with using dynamic dispatch caused by Rust not knowing the size of the trait object. The trait objects must be put behind a reference and the trait must conform to the object safety constraints. For example, say we wanted to clone the vector of shapes. To use clone we need to guarantee that our shapes derive Clone, this can be done using a subtrait. But if we try to make a trait that has Clone as a subtrait we can no longer use this trait as a trait object because of object safety.

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

There are workarounds to be able to clone trait objects [\[2\]](#references). But they are a pain and should be avoided if possible.
 
Enums can do everything a trait object would but the size of the enum is known and uses static dispatch. Allowing data structures that contain different shapes without having to worry about putting the type behind a reference and object safety constraints. Consider the previous example, one can simply derive clone for the enum and then implement the function, without any complaints from Rust.

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

## Discuss whether to use enums or traits
Currently I default to using enums for polymorphic behaviour as they get all of the benefits of static dispatch without having to deal with object safety issues.

There are still a couple of times that I use traits. The main reason I will use traits is if I want external code to be able to add types, which enums do not allow. I also consider using traits if the behaviour is very generic, such that the interface I am defining is not determined by the types. In this case I am confident I will not be using the types that implement the trait as trait objects so do not run into the issues caused by dynamic dispatch. For example, even if only used in the same module, one would not implement Clone as an enum. Finding such generic behaviour is rare however.

Some people argue that enums produce ugly code with methods that are long and hard to read and hence favour using traits. I disagree, if the methods start to get too long one can extract the logic into separate functions, even grouping these functions into a module if there a large number of methods. In fact, I think this makes the code easier to read. The methods can be used as a table of contents allowing one to view the logic by jumping to the functions, rather than have to search through the code for the individual types.

One gripe I have with enums is that the variants are not considered types in their own right, meaning one cannot create functions that only work with an individual variant from the enum. This can be solved by creating the types using structs and wrapping them in an enum, but it would be nice to not have to do this. An example is [the standard libraries implementation for IP addresses](https://doc.rust-lang.org/std/net/enum.IpAddr.html).

## Summary

In the majority of cases I need polymorphism I now use enums. I tend to only use traits if I want to allow users of the code to be able to add their own types or it is clear that the behaviour is not determined by the type. If I do use traits then I always favour using generics over trait objects. Trait objects should only be used when absolutely necessary due to the complications caused by object safety.

## References

1. [The Rust Programming Language Book - Trait Objects Perform Dynamic Dispatch](https://doc.rust-lang.org/book/ch17-02-trait-objects.html#trait-objects-perform-dynamic-dispatch)
2. [Rust forums - Is it possible to clone a boxed trait object?](https://users.rust-lang.org/t/solved-is-it-possible-to-clone-a-boxed-trait-object/1714/6)

## Further Reading
- [The Rust Programming Language Book - Enums and Pattern Matching](https://doc.rust-lang.org/book/ch06-00-enums.html)
- [The Rust Programming Language Book - Traits: Defining Shared Behaviour](https://doc.rust-lang.org/book/ch10-02-traits.html)
- [The Rust Programming Language Book - Using Trait Objects That Allow for Values of Different Types](https://doc.rust-lang.org/book/ch17-02-trait-objects.html)
