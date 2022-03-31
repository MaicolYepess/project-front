import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrumboardRoutingModule } from './scrumboard-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { BoardsComponent } from './boards/boards/boards.component';


@NgModule({
  declarations: [
    BoardsComponent
  ],
  imports: [
    CommonModule,
    ScrumboardRoutingModule,
    SharedModule,
  ]
})
export class ScrumboardModule { }
