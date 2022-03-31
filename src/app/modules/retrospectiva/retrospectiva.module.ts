import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRetrosComponent } from './list-retros/list-retros.component';
import { CreateRetroComponent } from './create-retro/create-retro.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Route[] = [
  {
    path     : '',
    component: ListRetrosComponent
  },
  {
      path     : 'create',
      component: CreateRetroComponent
  }
];

@NgModule({
  declarations: [
    ListRetrosComponent,
    CreateRetroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class RetrospectivaModule { }
