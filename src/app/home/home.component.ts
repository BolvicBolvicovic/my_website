import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../skills/skills.component';
import { Skills } from '../skills';
import { SkillsService } from '../skills.service';
import { ProjectPreview } from '../project-preview';
import { ProjectPreviewComponent } from '../project-preview/project-preview.component';
import { ProjectPreviewService } from '../project-preview.service';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-home',
  imports: [SkillsComponent, ProjectPreviewComponent, CommonModule, ProjectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  skillsList: Skills[] = [];
  projectPreviewList: ProjectPreview[] = []

  skillsService: SkillsService = inject(SkillsService);
  projectPreviewService: ProjectPreviewService = inject(ProjectPreviewService);

  constructor() {
    this.skillsList = this.skillsService.getAllSkills();
    this.projectPreviewList = this .projectPreviewService.getProjectPreviews().reverse();
  }
}
