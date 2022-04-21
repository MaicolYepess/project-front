import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {  Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
        'name',
        'description',
        'startDate',
        'totalStimate',
        'actions'
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
        private router: ActivatedRoute,
        private route: Router,
        private coockie: CookieService,
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

    openBoard(e : any){
        var encoded = btoa(JSON.stringify(e));
        this.coockie.set("objSprint", encoded);
        this.route.navigate(["board"]);
    }

    openUpdate(e : any){

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
                console.log(res);
                this.recentTransactionsDataSource.data = res;
                res.forEach(e => {
                    this.numbers.push(e.id.id);
                });
                this.lastId = this.getArrayMax(this.numbers);
                sessionStorage.setItem("lastId", this.lastId.toString());
            },
            (error) => {
                sessionStorage.setItem("lastId", '0');
                this.sprints = [];
            });
    }

    getArrayMax(array) {
        return Math.max.apply(null, array);
    }

    openDelete(e : any){
    }
    openUpdate(e:any){

    }
}
