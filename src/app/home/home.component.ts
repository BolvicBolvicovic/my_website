import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../skills/skills.component';
import { Skills } from '../skills';

@Component({
  selector: 'app-home',
  imports: [SkillsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  readonly skills: Skills[] = [
    {
      name: "C",
      url: "https://en.cppreference.com/w/c/language",
      logo_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/380px-C_Programming_Language.svg.png",
    },
    {
      name: "C++",
      url: "https://cplusplus.com/",
      logo_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/800px-ISO_C%2B%2B_Logo.svg.png",
    },
    {
      name: "Rust",
      url: "https://www.rust-lang.org",
      logo_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1024px-Rust_programming_language_black_logo.svg.png",
    },
    {
      name: "Go",
      url: "https://go.dev/",
      logo_src: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*i2skbfmDsHayHhqPfwt6pA.png",
    },
    {
      name: "NASM",
      url: "https://www.nasm.us/",
      logo_src: "/assets/nasm_logo.png"
    },
    {
      name: "oCaml",
      url: "https://ocaml.org/",
      logo_src: "/assets/ocaml_logo.png",
    },
    {
      name: "Python",
      url: "https://www.python.org/",
      logo_src: "/assets/python_logo.png",
    },
    {
      name: "Javascript Vanilla",
      url: "https://www.javascript.com/",
      logo_src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuYdLEzBvwemix8pwsncUkLLOQqnByncadg&s",
    },
    {
      name: "Docker",
      url: "https://www.docker.com/",
      logo_src: "/assets/docker_logo.png",
    },
    {
      name: "Git",
      url: "https://git-scm.com/",
      logo_src: "https://avatars.githubusercontent.com/u/18133?s=280&v=4",
    },
    {
      name: "Bash",
      url: "https://www.gnu.org/software/bash/",
      logo_src: "/assets/bash_logo.png"
    },
    {
      name: "Oracle VirtualBox",
      url: "https://www.virtualbox.org/",
      logo_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/VirtualBox_2024_Logo.svg/1024px-VirtualBox_2024_Logo.svg.png",
    },
    {
      name: "Linux",
      url: "https://www.linux.org/",
      logo_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/800px-Tux.svg.png",
    },
    {
      name: "MariaDB",
      url: "https://mariadb.org/",
      logo_src: "https://avatars.githubusercontent.com/u/4739304?s=280&v=4"
    },
  ];
}
