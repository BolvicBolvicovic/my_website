import { Component, Input } from '@angular/core';
import { ProjectPreview } from '../project-preview';

@Component({
  selector: 'app-project-preview',
  imports: [],
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.css'
})
export class ProjectPreviewComponent {
  @Input() projectPreview!: ProjectPreview;
}
