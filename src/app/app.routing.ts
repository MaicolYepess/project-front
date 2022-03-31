import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'projects' },
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'projects',
                loadChildren: () =>
                    import('app/modules/project-admin/project.module').then(
                        (m) => m.ProjectModule
                    ),
            },
        ],
    },
    {
        path: 'options/:id',
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: '',
                loadChildren: () =>
                    import(
                        'app/modules/options/options-app/options-app.module'
                    ).then((m) => m.OptionsAppModule),
            },
        ],
    },
    {
        path: 'scrumboard',
        component: LayoutComponent,
        loadChildren: () =>
            import('app/modules/options/scrum-board/scrumboard.module').then(
                (m) => m.ScrumboardModule
            ),
    },
    {
        path       : 'review',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: '', loadChildren: () => import('app/modules/review/review.module').then(m => m.ReviewModule)},
        ]
    },
    {
        path       : 'team',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: '', loadChildren: () => import('app/modules/team/team.module').then(m => m.TeamModule)},
        ]
    },
    {
        path       : 'retro',
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: '', loadChildren: () => import('app/modules/retrospectiva/retrospectiva.module').then(m => m.RetrospectivaModule)},
        ]
    }
];
