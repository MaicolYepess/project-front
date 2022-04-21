import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { SprintComponent } from '../sprint/sprint.component';
import { OptionsAppComponent } from './options-app.component';
import { ProductStackComponent } from '../product-stack/product-stack.component';
import { ProductStackFormComponent } from '../product-stack/product-stack-form/product-stack-form.component';
import { ReleaseComponent } from '../release/release.component';
import { ReleaseFormComponent } from '../release/release-form/release-form.component';
import { SprintFormComponent } from '../sprint/sprint-form/sprint-form.component';
import { NewHistoryFormComponent } from '../release/new-history-form/new-history-form.component';
import { ScrumboardBoardsComponent } from '../scrum-board/boards/boards.component';
import { ScrumboardCardDetailsComponent } from '../scrum-board/card/details/details.component';
import { ScrumboardComponent } from '../scrum-board/scrum-board.component';
import { ListReviewsComponent } from 'app/modules/review/list-reviews/list-reviews.component';
import { CreateReviewComponent } from 'app/modules/review/create-review/create-review.component';
import { DetailReviewComponent } from 'app/modules/review/detail-review/detail-review.component';
import { TeamComponent } from 'app/modules/team/team/team.component';
import { SendInviteComponent } from 'app/modules/team/send-invite/send-invite.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: OptionsAppComponent,
    },
    {
        path: 'sprint',
        component: SprintComponent,
    },
    {
        path: 'detail',
        component: DetailReviewComponent,
    },
    {
        path: 'create',
        component: CreateReviewComponent,
    },
];

@NgModule({
    declarations: [
        OptionsAppComponent,
        SprintComponent,
        ProductStackComponent,
        ProductStackFormComponent,
        ReleaseComponent,
        ReleaseFormComponent,
        SprintFormComponent,
        NewHistoryFormComponent,
        ScrumboardComponent,
        ScrumboardBoardsComponent,
        ScrumboardCardDetailsComponent,
        ListReviewsComponent,
        DetailReviewComponent,
        CreateReviewComponent,
        TeamComponent,
        SendInviteComponent,
    ],
    imports: [CommonModule, SharedModule, RouterModule.forChild(exampleRoutes)],
})
export class OptionsAppModule {}
