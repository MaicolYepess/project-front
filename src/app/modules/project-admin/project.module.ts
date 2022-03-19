import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProjectAdminComponent } from './project-admin.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectFormComponent } from './project-form/project-form.component';

const exampleRoutes: Route[] = [
  {
      path     : '',
      component: ProjectAdminComponent
  }
];

@NgModule({
  declarations: [
    ProjectAdminComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(exampleRoutes),
  ]
})
export class ProjectModule { }
