import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Skills } from './skills';
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HomeComponent, SkillsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my_website';

  readonly skills: Skills[] = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/victorcornille/",
      logo_src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEYt0yyh6uNDKL8uksVLlhZ35laKNQgZ9g&s",
    },
    {
      name: "Github",
      url: "https://github.com/BolvicBolvicovic",
      logo_src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/220px-GitHub_Invertocat_Logo.svg.png",
    },
  ];
}
