import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewHistoryFormComponent } from './modules/options/release/new-history-form/new-history-form.component';
import { ScrumboardBoardComponent } from './modules/options/scrum-board/board/board.component';
import { SharedModule } from './shared/shared.module';
import { ScrumboardBoardAddListComponent } from './modules/options/scrum-board/board/add-list/add-list.component';
import { ScrumboardBoardAddCardComponent } from './modules/options/scrum-board/board/add-card/add-card.component';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    declarations: [AppComponent, ScrumboardBoardComponent, ScrumboardBoardAddListComponent, ScrumboardBoardAddCardComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        SharedModule,
        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        NgbModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
