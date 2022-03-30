import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards/boards.component';

const routes: Routes = [
  {
    path     : '',
    component: BoardsComponent
},
{
    path     : ':boardId',
    component: BoardsComponent,
    children : [
        {
            path     : 'card/:cardId',
            component: BoardsComponent
        }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrumboardRoutingModule { }
