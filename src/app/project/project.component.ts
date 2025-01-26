import { Component, Input } from '@angular/core';
import { ProjectPreview } from '../project-preview';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
 @Input() projectPreview!: ProjectPreview;
}
