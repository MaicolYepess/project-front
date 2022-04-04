import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReviewsComponent } from './list-reviews/list-reviews.component';
import { DetailReviewComponent } from './detail-review/detail-review.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { Route, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'app/shared/shared.module';

const routes: Route[] = [
  {
    path     : '',
    component: ListReviewsComponent
  },
  {
      path     : 'detail',
      component: DetailReviewComponent
  },
  {
      path     : 'create',
      component: CreateReviewComponent
  }
];

@NgModule({
  declarations: [
    ListReviewsComponent,
    DetailReviewComponent,
    CreateReviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    ListReviewsComponent,
    DetailReviewComponent,
    CreateReviewComponent
  ]
})
export class ReviewModule { }
