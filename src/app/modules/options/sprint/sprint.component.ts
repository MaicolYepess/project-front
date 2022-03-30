import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { SprintServiceService } from './sprint-service.service';

@Component({
    selector: 'app-sprint',
    templateUrl: './sprint.component.html',
    styleUrls: ['./sprint.component.scss'],
})
export class SprintComponent implements OnInit {
    sprints: any;
    idProject: string;
    lastId: number;
    numbers: any[] = [];
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'actions',
        'name',
        'description',
        'startDate',
        'totalStimate',
    ];
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
        private sprintService: SprintServiceService,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.idProject = this.router.snapshot.paramMap.get('id') || 'null';
        this.getSprints();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.recentTransactionsDataSource.filter = filterValue
            .trim()
            .toLowerCase();
    }

    openAddItem() {
        const dialogRef = this._matDialog.open(SprintFormComponent, {
            width: '850px',
        });
        dialogRef.afterClosed().subscribe((data) => {
            this.getSprints();
        });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    getSprints() {
        this.sprintService
            .getSprintsProject(this.idProject)
            .subscribe((res: any[]) => {
                this.sprints = res;
                this.recentTransactionsDataSource.data = this.sprints;
                res.forEach(e => {
                    this.numbers.push(e.id.id);
                });
                this.lastId = this.getArrayMax(this.numbers);
                sessionStorage.setItem("lastId", this.lastId.toString());
            });
    }

    getArrayMax(array) {
        return Math.max.apply(null, array);
    }
}
