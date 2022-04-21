import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Release } from 'app/core/models/release';
import { BehaviorSubject, Subject } from 'rxjs';
import { NewHistoryFormComponent } from './new-history-form/new-history-form.component';
import { ReleaseFormComponent } from './release-form/release-form.component';
import { ReleaseService } from './release.service';

export type Item = {
    id: string;
    name: string;
    children: Array<Item>;
};

@Component({
    selector: 'app-release',
    templateUrl: './release.component.html',
    styleUrls: ['./release.component.scss'],
})
export class ReleaseComponent implements OnInit {
    bufferValue = 75;
    data: Array<Release> = [];
    invert: boolean = true;
    idProject: string;
    releases: Release[];
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'actions',
        'name',
        'description',
        'estimationDate',
    ];
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
         this.data = [
             {
                 name: 'Release 1',
                 description: 'Release de prueba',
                 id: 'des',
                 value: 60,
                 children: [
                     {
                         description: 'Release de prueba',
                         id: 'ds',
                         projectId: 'ds',
                         assignedUser: '',
                         criteriaOfAcceptance: '',
                         files: '',
                         historyPoints: '',
                         parent: '',
                         release: 'des',
                         sprintId: '1',
                         title: 'Item 1',
                         type: 'Epica',
                         status: ''
                     },
                     {
                         description: 'Release de prueba',
                         id: 'ds',
                         projectId: 'ds',
                         assignedUser: '',
                         criteriaOfAcceptance: '',
                         files: '',
                         historyPoints: '',
                         parent: '',
                         release: 'des',
                         sprintId: '1',
                         title: 'Item 1',
                         type: 'Epica',
                         status: ''
                     },
                 ],
                 estimationDate: new Date(),
                 projectId: 'ds',
                 status: 'Activo',
             },
             {
                 name: 'Release 3',
                 description: 'Release de prueba',
                 id: 'des',
                 value: 30,
                 children: [],
                 estimationDate: new Date(),
                 projectId: 'ds',
                 status: 'Activo',
             },
             {
                 name: 'Release 3',
                 description: 'Release de prueba',
                 id: 'des',
                 value: 20,
                 children: [],
                 estimationDate: new Date(),
                 projectId: 'ds',
                 status: 'Activo',
             },
         ];
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
        dialogRef.afterClosed().subscribe((data) => {
            debugger
        });
    }

    openAddHistory() {
        const dialogRef = this._matDialog.open(NewHistoryFormComponent, {
            width: '850px',
        });
        dialogRef.afterClosed().subscribe((data) => {
        });
    }

    openEditItem(event: Release) {
        debugger
        const dialogRef = this._matDialog.open(ReleaseFormComponent, {
            width: '850px',
            data: event
        });
        dialogRef.afterClosed().subscribe((data) => {
        });
    }

    getReleases() {
        this._releasesService
            .getReleases(this.idProject)
            .subscribe((res: Release[]) => {
                this.releases = res;
               // this.data = this.releases;
            });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

  
    
      dropItem(event: CdkDragDrop<string[]>) {
          
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
        }
      }
    
      dropGroup(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.releases, event.previousIndex, event.currentIndex);
      }
}
