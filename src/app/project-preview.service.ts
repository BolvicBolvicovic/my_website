import { Injectable } from '@angular/core';
import { ProjectPreview } from './project-preview';

@Injectable({
  providedIn: 'root'
})
export class ProjectPreviewService {

  protected projectPreviews: ProjectPreview[] = [
    {
      id: "philosophers",
      name: "Philosophers",
      img: "https://github.com/BolvicBolvicovic/42/blob/master/Philosophers/philo/philo.png?raw=true",
      url: "https://github.com/BolvicBolvicovic/42/tree/master/Philosophers",
      description: "The classic computing problem of the dining philosophers. In this project, I learnt the basics of multithreading. I saw how to create threads and discovered mutexes.",
      keywords: ["C", "multithreading", "42"],
    },
    {
      id: "minishell",
      name: "minishell",
      url: "https://github.com/BolvicBolvicovic/42/tree/master/minishell",
      img: "https://github.com/BolvicBolvicovic/42/blob/master/minishell/minishell.png?raw=true",
      description: "This project is about creating a simple shell. I learnt a lot about parsing, processes and file descriptors.",
      keywords: ["C", "shell", "42"],
    },
    {
      id: "cub3d",
      name: "cub3D",
      url: "https://github.com/BolvicBolvicovic/42/tree/master/cub3d",
      img: "https://github.com/BolvicBolvicovic/42/blob/master/cub3d/backroom.png?raw=true",
      description: "Inspired by the world-famous Wolfenstein 3D game, which was the first FPS ever, this project enabled me to explore ray-casting. The goal was to make a dynamic view inside a maze, in which you have to find your way. I learnt how math enabled great possibilities with graphism and design.",
      keywords: ["C", "ray-casting", "42"],
    },
    {
      id: "game-of-life",
      name: "A Little Game of Life",
      url: "https://github.com/BolvicBolvicovic/Rust_Is_Great/tree/main/wasm-game-of-life",
      img: "https://github.com/BolvicBolvicovic/Rust_Is_Great/blob/main/wasm-game-of-life/gol.png?raw=true",
      description: "My first real Rust project! I made a Conway's game of life in Rust to experiment its wasm compilation and all the advantages that Rust brings as a fast, multi-paradigm and generally safe language. I found out that it is really good at creating a front-end library that can be combined with Javascript/Typescript.",
      keywords: ["Rust", "wasm", "Conway"],
    },
    {
      id: "inception",
      name: "Inception",
      url: "https://github.com/BolvicBolvicovic/42/tree/master/Inception",
      img: "https://github.com/BolvicBolvicovic/42/blob/master/Inception/screenshot.png?raw=truehttps://github.com/BolvicBolvicovic/42/blob/master/Inception/screenshot.png?raw=true",
      description: "This project aimed to broaden my knowledge of system administration by using Docker. I virtualized several Docker images on my personal virtual machine to launch a Wordpress application with a MariaDB database and a Nginx proxy server.",
      keywords: ["Docker", "VirtualBox", "MariaDB", "42"],
    },
    {
      id: "rogue",
      name: "rogue",
      url: "https://github.com/BolvicBolvicovic/Rust_Is_Great/tree/main/elevation/rogue",
      img: "https://github.com/BolvicBolvicovic/Rust_Is_Great/blob/main/elevation/rogue/rogue.png?raw=true",
      description: "rogue is a Rogue-like game. The labyrinth is randomly generated and the character has a field of view and fog of war. It is not completely finished but the main aspects, (exploration and random map generation), are done.",
      keywords: ["Rogue-like", "Rust", "game"],
    },
    {
      id: "ft_irc",
      name: "ft_irc",
      url: "https://github.com/BolvicBolvicovic/42/tree/master/ft_irc",
      img: "https://github.com/BolvicBolvicovic/42/blob/master/ft_irc/irc.png?raw=true",
      description: "This project was about creating my own IRC server in C++ and is, with the 9 C++ projects of 42 to learn the language, the base for my C++ knowledge. From parsing commands to handling sockets with polling, it was interresting to follow real standards for the first time. The project works with irssi, telnet and netcat.",
      keywords: ["C++", "server", "IRC", "socket", "42"],
    },
    {
      id: "rime",
      name: "Rime",
      url: "https://github.com/BolvicBolvicovic/rime",
      img: "https://github.com/BolvicBolvicovic/rime/blob/master/rime.png?raw=true",
      description: "Rime is intended to be a Vim-like text editor. Main frameworks are Ratatui, Crossterm and Clap. It was the first time that I did a Rust project without real tutorial and I built most of its features just by coming with my own logic.",
      keywords: ["Rust", "Vim", "Text editor", "TUI"]
    },
    {
      id: "ft_transcendence",
      name: "ft_transcendence",
      url: "https://github.com/Bonk-Corporation/ft_transcendence",
      img: "./assets/transcendence.png",
      description: "The goal of this project was to make a single page application displaying at least a Pong game. But we decided to get more ambitious... We added so many features that we could fail some of them and still get the highest grade by far. I did the pong game (which means drawing in the canvas with WebGl2 and handling the server-side for games) in Rust with Axum and the DOM (wasm-bindgen). As you can see on the main page on the left, we had much more than just pong.",
      keywords: ["SPA", "web", "team of six", "React", "Django", "Rust", "Godot"],
    },
    {
      id: "libasm",
      name: "libasm",
      url: "https://github.com/BolvicBolvicovic/libasm",
      img: "https://github.com/BolvicBolvicovic/libasm/blob/main/libasm.png?raw=true",
      description: "Short library libc-like in x86 assembly (NASM syntax). It was the first time I touched assembly code and I really liked it. It was a lot more easier than I expected and it taught a lot about why certain things were a certain way in C (i.e. the position of the arguments in many function of the string.h library for instance) and how computer instructions worked for the CPU.",
      keywords: ["nasm", "x86 assembly", "library", "42"]
    },
    {
      id: "snow-crash",
      name: "snow-crash",
      url: "",
      img: "./assets/snowcrash.png",
      description : "This project is an introduction to cyber-security. It is a 15 levels OS filled with vulnerabilites at each level, from unsafe PHP to compromising comments or constant left in programs that I could disassemble, passing by dubious logs.",
      keywords: ["cybersecurity", "42"]
    },
    {
      id: "kfs",
      name: "KFS",
      url: "https://github.com/BolvicBolvicovic/kfs",
      img: "https://github.com/BolvicBolvicovic/kfs/raw/main/screenshots/HELPER.png",
      description: "KFS is a 32-BITs kernel from scratch built in C/x86 asm (GAS syntax) for study purposes. It is the first kernel I have ever written and is also the project I have learnt the most from. All the features I have implemented are listed in the README that you can find on the project page. I can mention that I have built an efficient CLI tool inside the kernel for testing purposes and a somewhat safe and performant allocator that can be used to build other drivers.",
      keywords: ["C", "kernel", "42"],
    },
    {
      id: "krabbos",
      name: "krabbOS",
      url: "https://github.com/BolvicBolvicovic/krabbos",
      img: "https://keyst.one/images/A_hardware_wallet_developed_using_the_Rust_programming_language_758baafadb.jpg",
      description: "krabbOS is the 64-BITs re-writting of my kernel from scratch in Rust with the goal to reach even further with the possibilities of the OS. It is the occasion for me to put in practice the skills I learnt previously with both KFS and Rust. By looking at the trajectory of the Linux kernel and as I was getting a bit rusty 🙂 with my Rust, I decided it was time for me to build this OS so later I could dive on the Linux kernel and start to write drivers and contribute to it. This project is still ongoing.",
      keywords: ["Rust", "kernel", "42"],
    },
    {
      id: "ft_turing",
      name: "ft_turing",
      url: "https://github.com/BolvicBolvicovic/ft_turing",
      img: "https://github.com/BolvicBolvicovic/ft_turing/raw/main/img/turing_machine.jpg",
      description: "The Turing project of 42. ft_turing is the functionnal implementation of a single infinite tape Turing machine (and my first real project with oCaml). But it actually goes beyond. Since each Turing machine is \"encoded\" in a JSON file, it was relativelly easy to come up with Turing machines that could solve unary additions or tell if a word is a palindrom. But when I had to write a machine that could run the previous machines, a so-called Universal Turing Machine (UTM), I found out that writting the JSON by hand would be almost impossible. It turned out that I was right, my UTM is more that 50 000 lines long. I had to write an \"assembly language\" that compiled to JSON so I could do it in a bit more than 300 lines of code. It has been one of my favorite language and has improved my knowledge about code a lot with this new paradigm.",
      keywords: ["Turing", "oCaml", "compiler", "42"]
    },
    {
      id: "bluebeam",
      name: "bluebeam",
      url: "https://bluebeam.dev",
      img: "./assets/bluebeam.jpg",
      description: "bluebeam is a SaaS platform bridging market research and business intelligence. It empowers you to conduct unlimited industry analyses by scanning websites of your choice against your own custom criteria, delivering tailored insights for smarter decision-making. It is entirely built with Go (Gin and the basic templating system) and calls to AI and Cloud APIs with SDKs for Python. It is launch with Docker on an EC2 compute platform of aws Cloud and is protected Cloudflare.",
      keywords: ["SaaS", "AI", "Go", "SDK", "market research", "business intelligence", "aws cloud"],
    },
    {
      id: "red-tetris",
      name: "red-tetris",
      url: "https://github.com/BolvicBolvicovic/red_tetris",
      img: "https://github.com/BolvicBolvicovic/red_tetris/blob/main/assets/red-tetris.png?raw=true",
      description: "The objective of this project is to develop a networked multiplayer tetris game from a stack of software exclusively Full Stack TypeScript. You have access to two game modes. A mode \"solo\" and a mode \"multiplayer\". The solo mode is the classic Tetris. You score for every piece that you place and for every line that you complete. The multiplayer mode is based on the same basics but is played between several players. Each player has his own playing field, all players undergo the same series of pieces. As soon as a player destroys lines on his ground, the opposing players receive n - 1 lines in penalty, then indestructible, which fit at the bottom of their playground. Each player can graphically observe the specter of their opponents land. A spectrum indicates a current terrain without its current piece. As soon as the terrain is updated, (when the current piece is fixed to the terrain), all opponents visualize the evolution of their spectrum.",
      keywords: ["42", "TypeScript", "FullStack", "Tetris"]
    },
    {
      id: "sample_app",
      name: "SampleApp",
      url: "https://thephoenixtutorial.org/book/ch1_from_zero_to_deploy",
      img: "https://github.com/BolvicBolvicovic/sample_app/blob/main/assets/images/home.png?raw=true",
      description: "This app has been developped by following the book 'Phoenix Tutorial (Phoenix 1.6): Learn Web Development with Phoenix' and is my first application with Elixir and Phoenix. Even if it is 'just' a sample app, as I spent quite some time on it, learnt a fair share of elixir and had a lot of fun while doing so, I decided to mention it in my portfolio. I strongly recommend to read the book even if the version of Phoenix is older. This part of the tutorial focuses on developing a single large real sample application (called sample_app), writing all the code from scratch. I developed the sample app using a combination of mockups, test-driven development (TDD), and integration tests. I started by creating static pages and then added a little dynamic content. Then I completed the foundation for the sample application by making a site layout, a user data model, and a full registration and authentication system. Finally, I’ll add microblogging and social features to make a working example site.",
      keywords: ["Phoenix", "Elixir", "First application"],
    },
  ];
  
  getProjectPreviews(): ProjectPreview[] {
    return this.projectPreviews;
  }
  constructor() { }
}
