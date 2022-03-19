import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { SprintComponent } from '../sprint/sprint.component';
import { OptionsAppComponent } from './options-app.component';
import { ProductStackComponent } from '../product-stack/product-stack.component';
import { ScrumBoardComponent } from '../scrum-board/scrum-board.component';
import { ProductStackFormComponent } from '../product-stack/product-stack-form/product-stack-form.component';

const exampleRoutes: Route[] = [
  {
    path     : '',
    component: OptionsAppComponent
  },
  {
      path     : 'sprint',
      component: SprintComponent
  }
];

@NgModule({
  declarations: [
    OptionsAppComponent,
    SprintComponent,
    ProductStackComponent,
    ScrumBoardComponent,
    ProductStackFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(exampleRoutes),
  ]
})
export class OptionsAppModule { }
