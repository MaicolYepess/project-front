import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'app/core/models/item';
import { BehaviorSubject } from 'rxjs';
import { ProductStackFormComponent } from './product-stack-form/product-stack-form.component';
import { ProductStackService } from './product-stack.service';

@Component({
    selector: 'app-product-stack',
    templateUrl: './product-stack.component.html',
    styleUrls: ['./product-stack.component.scss'],
})
export class ProductStackComponent implements OnInit {
    idProject: any;
    items: any[] = [];
    epicaCount: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'title',
        'type',
        'assignedUser',
        'description',
        'criteriaOfAcceptance',
        'actions',
    ];
    item: Item[] = [];
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
        private itemService: ProductStackService,
        private router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.idProject = sessionStorage.getItem('idProject');
        this.getItems();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.recentTransactionsDataSource.filter = filterValue
            .trim()
            .toLowerCase();
    }

    openAddItem() {
        const dialogRef = this._matDialog.open(ProductStackFormComponent, {
            width: '850px',
        });
        dialogRef.afterClosed().subscribe((data) => {
            this.getItems();
        });
    }

    openUpdate(e: any) {
        const dialogRef = this._matDialog.open(ProductStackFormComponent, {
            width: '850px',
            data: e,
        });
        dialogRef.afterClosed().subscribe((data) => {
            this.getItems();
        });
    }

    openDelete(e: any) {}

    getItems() {
        this.itemService.getItems(this.idProject).subscribe(
            (Response) => {
                this.item = Response;
                this.recentTransactionsDataSource.data = this.item;
                this.recentTransactionsDataSource.paginator = this.paginator;
                this.epicaCount = Response.filter(
                    (obj) => obj.type === 'Epica'
                ).length;
            },
            (error) => {
                this.item = [];
            }
        );
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    openUpdate(e: any){

    }
}
