import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { ReleaseFormComponent } from './release-form/release-form.component';
import { ReleaseService } from './release.service';

@Component({
    selector: 'app-release',
    templateUrl: './release.component.html',
    styleUrls: ['./release.component.scss'],
})
export class ReleaseComponent implements OnInit {
    idProject: string;
    releases: any;
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'actions',
        'name',
        'description',
        'estimationDate',
    ];

    list2 = ['drag me around 2'];
    with: '850px';
    filters: {
        categorySlug$: BehaviorSubject<string>;
        query$: BehaviorSubject<string>;
        hideCompleted$: BehaviorSubject<boolean>;
    } = {
        categorySlug$: new BehaviorSubject('all'),
        query$: new BehaviorSubject(''),
        hideCompleted$: new BehaviorSubject(false),
    };
    constructor(
        private _matDialog: MatDialog,
        private _releasesService: ReleaseService
    ) {}

    ngOnInit(): void {
        this.idProject = sessionStorage.getItem('idProject');
        this.getReleases();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.recentTransactionsDataSource.filter = filterValue
            .trim()
            .toLowerCase();
    }

    openAddItem() {
        const dialogRef = this._matDialog.open(ReleaseFormComponent, {
            width: '850px',
        });
        dialogRef.afterClosed().subscribe((data) => {});
    }

    getReleases() {
        this._releasesService
            .getReleases(this.idProject)
            .subscribe((res: any[]) => {
                this.releases = res;
                this.recentTransactionsDataSource.data = this.releases;
                console.log(res);
            });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    drop(event: CdkDragDrop<string[]>) {
      debugger
        if (event.previousContainer !== event.container) {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );

            // combine here
            if (this.releases.length > 1) {
                this.releases[0] = this.releases[0] + ' ' + this.releases[1];
                this.releases = [this.releases[0]];
            } else if (this.list2.length > 1) {
                this.list2[0] = this.list2[0] + ' ' + this.list2[1];
                this.list2 = [this.list2[0]];
            }
            // then you would delete all the containers that had length 0
        }
    }
}
