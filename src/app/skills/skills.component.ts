import { Component, Input } from '@angular/core';
import { Skills } from '../skills';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  @Input() skills!: Skills;
}
