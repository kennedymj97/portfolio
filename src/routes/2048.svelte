<script>
  import Game from '../components/2048.svelte';
  import H2 from '../components/H2.svelte';
  import H3 from '../components/H3.svelte';
  import H4 from '../components/H4.svelte';
  import P from '../components/P.svelte';
</script>

<svelte:head>
  <title>2048 AI</title>
</svelte:head>

<div class="flex flex-col">
  <div class="flex flex-col px-4 mx-auto max-w-screen-lg">
    <h1 class="my-6 text-4xl font-semibold">
      Producing a highly optimsied engine and performant AI for 2048
    </h1>
    <P>
      The goal of this project was to produce a highly optimised engine for the
      game 2048. The game engine implements all the behaviour needed to play the
      game 2048, such as shifting and merging tiles, inserting random new tiles,
      and calculating the score. My MSc thesis was on using artificial
      intelligence methods to find strategies for the game of 2048. The aim was
      to find strategies which human players could understand and replicate
      whilst maximising performance. This required testing millions of possible
      strategies, making billions of moves. Therefore, having a fast game engine
      was an essential foundation. To stress test the engine an expectimax
      algorithm was used. This algorithm can perform very well on 2048, often
      reaching the 32,768 tile. To achieve a score so large, more than 18,000
      moves and over 90 billion game states need to be considered. If the engine
      was not extremely well optimised this would take a very long time.
    </P>
    <span>In this post I discuss the following:</span>
    <ul class="mb-4 list-disc list-inside">
      <li>Methodology used to create the optimised engine</li>
      <li>Implementation details of the engine</li>
      <li>The expectimax algorithm</li>
    </ul>
    <P>
      The engine implemented takes roughly 3 nanoseconds to make a move, a
      factor of 30,000 faster than the 100,000 nanoseconds that the original web
      version. The expectimax algorithm uses heuristics developed in previous
      work, but takes advantage of multithreading to run over 50% faster.
    </P>
    <P>
      The game below is an adapted version of the original
      <a
        onclick="document.getElementById('reference1').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[1]</a
      >. It is being played by the expectimax algorithm with a search depth
      limit of 6. The code for the engine, expectimax algorithm and WebAssembly
      interface can be found here
      <a
        onclick="document.getElementById('reference2').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[2]</a
      >.
    </P>
  </div>
  <div class="flex items-center justify-center py-8 my-4 bg-gray-100">
    <Game></Game>
  </div>
  <div class="flex flex-col px-4 mx-auto mb-16 max-w-screen-lg">
    <H2>Why Rust?</H2>
    <P>
      As performance of the engine was essential it was important that the
      language used to develop the engine did not introduce significant
      overhead. Rust was ideal as it has no runtime or garbage collector,
      resulting in performance characteristics similar to C/C++. Rust also has
      excellent support for WebAssembly
      <a
        onclick="document.getElementById('reference3').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[3]</a
      >, allowing the optimised engine code to be run in the browser. As the
      goal of the thesis was to try and find strategies a human could understand
      user tests were carried out, these user tests were conducted using a site
      I developed
      <a
        onclick="document.getElementById('reference4').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[4]</a
      >. Therefore, being able to use the optimised engine in the browser was
      essential. It also allowed me to run the expectimax algorithm in the
      browser as you can see being demonstrated above.
    </P>
    <H2>Methodology</H2>
    <H4>
      1. Create a basic, unoptimised implementation of the engine along with a
      test suite.
    </H4>
    <P>
      The basic implementation acted as a starting point. It was a complete
      engine that fully captured the rules of the game. However, it was not
      designed with speed in mind. The engine was fast enough for a person or
      simple computer agents to play, but if left unoptimised would have been a
      significant barrier to developing algorithms that require more
      computation. The test suite ensured that the implementation fully captured
      the game rules. As the engine was optimised and the code changed this test
      suite provided a guarantee that no bugs were being introduced.
    </P>
    <H4>
      2. Research existing approaches to building AI for 2048. See what
      techniques they used to produce an optimised engine.
    </H4>
    <P>
      This research involved reading papers and posts online from people who
      were working on developing AIs to play 2048. Of particular interest was a
      post on Stack Overflow
      <a
        onclick="document.getElementById('reference5').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[5]</a
      >. The final version of the optimised engine uses the techniques described
      to achieve a high level of performance.
    </P>
    <H4>3. Build an expectimax algorithm to play the game.</H4>
    <P>
      This algorithm can require the consideration of over 90 million game
      states for an individual move making it a good test for the performance of
      the engine.
    </P>
    <H4>
      4. Use the profiling tools on a run of the expectimax algorithm. Identify
      the bottlenecks.
    </H4>
    <P>
      Profiling tools were used to understand which areas of the code were
      taking the most time and acting as bottlenecks. The Linux tool ‘perf’
      <a
        onclick="document.getElementById('reference6').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[6]</a
      >
      was used to gather data. To visualise the data generated by ‘perf’ flame
      graphs were used
      <a
        onclick="document.getElementById('reference7').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[7]</a
      >. This made it easy to identify the code that was taking the most time.
      One of the flame graphs produced can be seen in
      <a
        onclick="document.getElementById('figure1').scrollIntoView(true)"
        class="cursor-pointer"
        >Figure 1</a
      >.
    </P>
    <script>
      function scrollTo(id) {
        document.getElementById(id).scrollIntoView(true);
      }
    </script>
    <P>
      Profiling the code required an executable that would stress test the
      engine. The expectimax algorithm developed was perfect for this, the large
      number of game state considered acts as a great wat to thorougly test the
      performance of the engine and gather data for profiling.
    </P>
    <figure class="mt-4 mb-8" id="figure1">
      <img src="flamegraph.png" class="mb-4" />
      <figcaption class="text-center text-gray-700">
        Figure 1: Example of a flamegraph produced using the profiling tools.
      </figcaption>
    </figure>
    <H4>
      5. Create benchmarks for the code identified using the profiling tools.
    </H4>
    <P>
      Benchmarks were used to measure the performance characteristics of the
      engine. The benchmarks were created using a library called Criterion
      <a
        onclick="document.getElementById('reference8').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[8]</a
      >. Criterion stores data from previous benchmarks and uses them to compare
      to the current benchmark to show the changes in performance.
    </P>
    <P>
      The data generated from running the profiling tools on the expectimax
      algorithm provided insights into what code was causing the bottlenecks in
      performance. If they did not already exist, benchmarks were created to
      cover the area of the code identified. The code was then changed in an
      attempt to make it have higher performance. After making changes the
      benchmarks were rerun to identify if the changes had improved the
      performance. If they had the changes would be kept. This process was
      repeated until there were no further changes to be made to improve the
      performance of the engine.
    </P>
    <H4>6. Edit the code to try to improve the performance.</H4>
    <P>
      Use algorithms and data structures found during research along with new
      ideas of how to improve performance. After making the changes rerun the
      benchmarks to ensure performance has improved.
    </P>
    <H4>
      7. Repeat steps 4-6 until no further performance improvements can be made
    </H4>
    <H2>Implementation</H2>
    <P>
      This implementation was based off the work done by Nneonneo
      <a
        onclick="document.getElementById('reference5').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[5]</a
      >. The game state is represented using a single 64-bit integer. This
      integer is split into 16 4-bit chunks to represent each tile of the board.
      Each of these 4-bit chunks does not contain the true value of the tile on
      the board as it is only possible to represent the decimal numbers 0-15.
      Instead the number represents the exponent of the power of 2 required to
      get the true tile value. This allows tiles up to the value 32,768. The
      highest possible tile theoretically is 131,072. However, even the best AIs
      have never reached the tile of 65,536. The aim of this project was no to
      try to produce an AI that is the state of the art, as a result, the
      implementation does not handle cases where the tile is larger than 32,768.
      Bitwise operations are used to interact with the board state.
    </P>
    <P>
      A cache is used to store all the possible shifts of the rows or columns:
      shift row left, shift row right, shift column up and shift column down. As
      each row/column can be represented using a 16-bit integer there are 65,536
      different possibile states. When the engine is initialies the resulting
      value after shifting for each direction is calculated and the results are
      stored in an array of length 65,536. This means there is some initial
      overhead to generate the arrays, but after calculating shifts only
      requires an array lookup rather than a more complicated computation. There
      is also a cache that contains the resulting score for each row. For the
      use cases I am concerned about, which require consideration of a huge
      number of game states, this initial overhead to produce the cache is well
      worth it.
    </P>
    <P>
      These optimisations to the engine mean that the computation for making a
      move can be carried out in 3 nanoseconds. Allowing consideration of
      billions of game states in a reasonable amount of time. The original web
      version takes rougly 100,000 nanoseconds per move. The optimisation
      resulted in engine that was faster by a factor of 30,000.
    </P>
    <H2>Expectimax</H2>
    <P>
      The expectimax algorithm is similar to the more popular minimax algorithm.
      In the minimax algorithm when deciding the best move to make one considers
      the best possible move of the opponent. In the expectimax algorithm the
      opponents options are weighted by the probability that the opponent will
      use that option. For 2048 the opponent can be considered to be the random
      tile additions to the board. Therefore, every empty tile location with
      both the 2 and 4 tiles are considered. The players options are of course
      the 4 move directions. The move the algorithm will recommend is the one
      which, after considering all the possibilites will most likely return the
      highest score. This score is not the score of the game state but is a
      heuristic score designed to encourage desirable game states. I did not
      make any adaptions to previous work
      <a
        onclick="document.getElementById('reference5').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[5]</a
      >.
      <a
        onclick="document.getElementById('figure2').scrollIntoView(true)"
        class="cursor-pointer"
        >Figure 2</a
      >
      shows an example of the start of the expectimax search tree if there are 3
      empty tiles after shifting in any of the directions.
    </P>
    <figure class="mt-4 mb-8" id="figure2">
      <img src="expectimax.svg" class="mb-4" />
      <figcaption class="text-center text-gray-700">
        Figure 2: the start of the expectimax search tree (depth 1), where all 4
        moves result in there being 3 empty spaces remaining on the board.
      </figcaption>
    </figure>
    <P>
      As the depth of the search tree increases the number of states that need
      to be considered grows exponentially. The search depth is incremented
      after considering both the move and the new tile location so
      <a
        onclick="document.getElementById('figure2').scrollIntoView(true)"
        class="cursor-pointer"
        >Figure 2</a
      >
      is only at a search depth of 1 and already considers 29 different game
      states. The depth the expectimax algorithm will search is calculated as
      follows.
    </P>
    <span class="mb-4 italic font-semibold text-center">
      search_depth = max(3, number_of_unique_tiles - 2)
    </span>
    <P>
      At this search depth it is possible for over 90 million different game
      states to be considered for an individual move. For games that reach the
      32,768 tile more than 18,000 moves can be made and more than 90 billion
      game states considered.
      <span class="italic"
        >Note: the algorithm used on this site limits the search depth to a
        maximum of 6 to make it run faster, this does sacrifice performance but
        still regularly achieves the 16,384 tile.</span
      >
    </P>
    <P>
      The highly optimised rust engine along with the expectimax algortihm was
      as fast as the C++ implementation by Nneonneo
      <a
        onclick="document.getElementById('reference9').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[9]</a
      >. As I used the same heuristics the score the algorithm can achieve was
      also the same. I improved the speed of the expectimax algorithm using
      multithreading. Each of the initial branches was evaluated in its own
      thread, making the algorithm run in 4 threads as opposed to 1. On my PC
      the multithreaded version would make a move in an average of 20ms compared
      to the 42ms of the single threaded version. The multithreaded version was
      therefore over 50% faster. As far as I am aware, this is the best
      performing expectimax algorithm for the game of 2048 created. As the
      expectimax algorithm is one of the best AIs created, the AI produced in
      this project is one of the best performing in the world! I expect that the
      search tree could be paralellized further, however I didn't want to spawn
      a new thread for every branch as I thought the overhead for thread
      creation would likely outweigh the benefits. I did not experiment with
      this as producing the fastest expectimax algorithm was not the goal of the
      project.
    </P>
    <P>
      As the heuristics used were the same as those used by Nneonneo one would
      expect the distribution of highest tiles reached to be the same.
      Interestingly, after running the algorithm for 100 games the distribution
      was significantly different. The percentage of games that reached at least
      the 16,384 was similar, 92% compared to the 94% reported by Nneonneo
      <a
        onclick="document.getElementById('reference5').scrollIntoView(true)"
        class="text-blue-700 cursor-pointer"
        >[5]</a
      >. However, in my 100 runs the 4096 tile was the highest tile once and the
      32,768 tile was only reached in 22% of the games. The medians were similar
      with 393,178 compared to 387,222, interestingly that means even though the
      32,768 tile was reached less the median score achieved was higher. The
      higest score reached was also higher during my 100 runs, with a score of
      806,864 compared to 794,076. As the game is inherently very random there
      is a large variance in the results achieved, which is likely what caused
      the number of games in which the 32,768 tile to be significantly less. The
      100 runs used is not enough to report an accurate highest tile
      distribution, meaning it is likely that both reported distriutions are
      inaccurate.
    </P>
    <table class="self-center inline-block mb-4 table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Statistic</th>
          <th class="px-4 py-2">My result</th>
          <th class="px-4 py-2">Nneonneo's result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2 border">Runs that reached at least 4096</td>
          <td class="px-4 py-2 border">100%</td>
          <td class="px-4 py-2 border">100%</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="px-4 py-2 border">Runs that reached at least 8192</td>
          <td class="px-4 py-2 border">99%</td>
          <td class="px-4 py-2 border">100%</td>
        </tr>
        <tr>
          <td class="px-4 py-2 border">Runs that reached at least 16384</td>
          <td class="px-4 py-2 border">92%</td>
          <td class="px-4 py-2 border">94%</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="px-4 py-2 border">Runs that reached at least 32768</td>
          <td class="px-4 py-2 border">22%</td>
          <td class="px-4 py-2 border">36%</td>
        </tr>
        <tr>
          <td class="px-4 py-2 border">Median score</td>
          <td class="px-4 py-2 border">393178</td>
          <td class="px-4 py-2 border">387222</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="px-4 py-2 border">Maximum score</td>
          <td class="px-4 py-2 border">806864</td>
          <td class="px-4 py-2 border">794076</td>
        </tr>
      </tbody>
    </table>
    <H2>Summary</H2>
    <P>
      The goal of this project was to produce a 2048 engine that could consider
      game states as fast as possible to facilitate the consideration of
      millions of different strategies as part of my master's thesis. An expectimax
      algorithm was developed to stress test the engine and profiling and
      benchmarking tools used to guide changes and ensure their efficacy. The
      resulting engine could make moves in approximately 3 nanoseconds, allowing
      billions of game states to be considered in a reasonable time. In
      addition, multithreading was used to improve the speed of the expectimax
      algorithms search by over 50%. The heuristics used were sourced from the
      best current expectimax implementation for 2048, meaning the expectimax
      algorithm here is the best performing created.
    </P>
    <H2>References</H2>
    <ul class="list-decimal list-inside">
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference1"
          target="_blank"
          href="https://github.com/gabrielecirulli/2048"
          >Original web version of the game by Gabriele Cirulli.</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference2"
          target="_blank"
          href="https://github.com/kennedymj97/2048-AI"
          >Repository containing the engine, expectimax algorithm and
          WebAssembly interface.</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference3"
          target="_blank"
          href="https://webassembly.org/"
          >WebAssembly</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference4"
          target="_blank"
          href="https://msc.mattkennedy.io/"
          >User testing site for my MSc thesis.</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference5"
          target="_blank"
          href="https://stackoverflow.com/a/22498940"
          >What is the optimal algorithm for 2048? Nneonneo answer.</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference6"
          target="_blank"
          href="https://perf.wiki.kernel.org/index.php/Main_Page"
          >The perf profiling tool.</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference7"
          target="_blank"
          href="https://github.com/brendangregg/FlameGraph"
          >Flame Graphs to visualise profiled code by Brendan Gregg.</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference8"
          target="_blank"
          href="https://bheisler.github.io/criterion.rs/book/index.html"
          >Criterion.rs documentation.</a
        >
      </li>
      <li>
        <a
          class="text-blue-700 visited:text-purple-700"
          id="reference9"
          target="_blank"
          href="https://github.com/nneonneo/2048-ai"
          >Repository containing code referenced by Nneonneos Stack Overflow
          answer.</a
        >
      </li>
    </ul>
  </div>
</div>
