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
      url: "",
      description: "In this project, I learnt the basics of threading a process. I saw how to create threads and discovered mutexes.",
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
      description: "Inspired by the world-famous Wolfenstein 3D game, which was the first FPS ever, this project enabled me to explore ray-casting. The goal was to make a dynamic view inside a maze, in which you have to find your way.",
      keywords: ["C", "ray-casting", "42"],
    },
    {
      id: "game-of-life",
      name: "A Little Game of Life",
      url: "https://github.com/BolvicBolvicovic/Rust_Is_Great/tree/main/wasm-game-of-life",
      img: "https://github.com/BolvicBolvicovic/Rust_Is_Great/blob/main/wasm-game-of-life/gol.png?raw=true",
      description: "A Little Game of Life, as its name fomulates it, is a game of life made in Rust and compiled in wasm.",
      keywords: ["Rust", "wasm", "Conway"],
    },
    {
      id: "inception",
      name: "Inception",
      url: "https://github.com/BolvicBolvicovic/42/tree/master/Inception",
      img: "https://github.com/BolvicBolvicovic/42/blob/master/Inception/screenshot.png?raw=truehttps://github.com/BolvicBolvicovic/42/blob/master/Inception/screenshot.png?raw=true",
      description: "This project aimed to broaden my knowledge of system administration by using Docker. I virtualized several Docker images on my personal virtual machine",
      keywords: ["Docker", "VirtualBox", "MariaDB", "42"],
    },
    {
      id: "rogue",
      name: "rogue",
      url: "https://github.com/BolvicBolvicovic/Rust_Is_Great/tree/main/elevation/rogue",
      img: "https://github.com/BolvicBolvicovic/Rust_Is_Great/blob/main/elevation/rogue/rogue.png?raw=true",
      description: "Rogue-like game. The labyrinth is randomly generated and the character has a FoV and FoW. It is not completely finished but the main aspect (exploration), of it is there.",
      keywords: ["Rogue-like", "Rust", "game"],
    },
    {
      id: "ft_irc",
      name: "ft_irc",
      url: "https://github.com/BolvicBolvicovic/42/tree/master/ft_irc",
      img: "https://github.com/BolvicBolvicovic/42/blob/master/ft_irc/irc.png?raw=true",
      description: "This project was about creating my own IRC server.",
      keywords: ["C++", "server", "IRC", "socket", "42"],
    },
    {
      id: "rime",
      name: "Rime",
      url: "https://github.com/BolvicBolvicovic/rime",
      img: "https://github.com/BolvicBolvicovic/rime/blob/master/rime.png?raw=true",
      description: "Rime is intended to be a Vim-like text editor. Main frameworks are Ratatui, Crossterm and Clap.",
      keywords: ["Rust", "Vim", "Text editor", "TUI"]
    },
    {
      id: "ft_transcendence",
      name: "ft_transcendence",
      url: "https://github.com/Bonk-Corporation/ft_transcendence",
      img: "./assets/transcendence.png",
      description: "The goal of this project was to make a single page application displaying at least a Pong game. But we decided to get more ambitious... ",
      keywords: ["SPA", "web", "team of six", "React", "Django", "Rust", "Godot"],
    },
    {
      id: "libasm",
      name: "libasm",
      url: "https://github.com/BolvicBolvicovic/libasm",
      img: "https://github.com/BolvicBolvicovic/libasm/blob/main/libasm.png?raw=true",
      description: "Short library libc-like in x86 NASM ",
      keywords: ["nasm", "x86 assembly", "library", "42"]
    },
    {
      id: "snow-crash",
      name: "snow-crash",
      url: "",
      img: "./assets/snowcrash.png",
      description : "This project is an introduction to cyber security",
      keywords: ["cybersecurity", "42"]
    },
    {
      id: "kfs",
      name: "KFS",
      url: "https://github.com/BolvicBolvicovic/kfs",
      img: "https://github.com/BolvicBolvicovic/kfs/raw/main/screenshots/HELPER.png",
      description: "KFS is a kernel for study purposes. It is the first kernel I write. Be indulgent.",
      keywords: ["C", "kernel", "42"],
    },
    {
      id: "krabbos",
      name: "krabbOS",
      url: "https://github.com/BolvicBolvicovic/krabbos",
      img: "https://avatars.githubusercontent.com/u/130611478?v=4",
      description: "krabbOS is the re-writting of KFS in Rust with the goal to reach even further with the possibilities of the OS.",
      keywords: ["Rust", "kernel", "42"],
    },
    {
      id: "ft_turing",
      name: "ft_turing",
      url: "https://github.com/BolvicBolvicovic/ft_turing",
      img: "https://github.com/BolvicBolvicovic/ft_turing/raw/main/img/turing_machine.jpg",
      description: "The ft_turing project of 42. The ft_turing project is functionnal implementation of a single infinite tape Turing machine.",
      keywords: ["Turing", "oCaml", "compiler", "42"]
    },
    {
      id: "bluebeam",
      name: "bluebeam",
      url: "https://github.com/BolvicBolvicovic/bluebeam",
      img: "https://github.com/BolvicBolvicovic/bluebeam/raw/main/images/bluebeam.png",
      description: "bluebeam is a SaaS platform bridging market research and business intelligence. It empowers you to conduct unlimited industry analyses by scanning websites of your choice against your own custom criteria, delivering tailored insights for smarter decision-making.",
      keywords: ["SaaS", "AI", "Go", "SDK", "market research", "business intelligence", "aws cloud"],
    },
  ];
  
  getProjectPreviews(): ProjectPreview[] {
    return this.projectPreviews;
  }
  constructor() { }
}
