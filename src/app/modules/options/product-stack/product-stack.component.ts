import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'app/core/models/item';
import { BehaviorSubject } from 'rxjs';
import { ProductStackFormComponent } from './product-stack-form/product-stack-form.component';
import { ProductStackService } from './product-stack.service';

@Component({
  selector: 'app-product-stack',
  templateUrl: './product-stack.component.html',
  styleUrls: ['./product-stack.component.scss']
})
export class ProductStackComponent implements OnInit {
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = ['actions', 'title', 'type', 'assignedUser', 'description', 'criteriaOfAcceptance'];
  item: Item[] = [];
  with: '850px';
  filters: {
    categorySlug$: BehaviorSubject<string>;
    query$: BehaviorSubject<string>;
    hideCompleted$: BehaviorSubject<boolean>;
} = {
    categorySlug$ : new BehaviorSubject('all'),
    query$        : new BehaviorSubject(''),
    hideCompleted$: new BehaviorSubject(false)
};
  constructor(private _matDialog: MatDialog,
    private itemService: ProductStackService,) { }

  ngOnInit(): void {
    this. getItems();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recentTransactionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddItem(){
    const dialogRef = this._matDialog.open(ProductStackFormComponent, { width: '850px'});
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  getItems(){
    this.itemService.getProjects().subscribe((res: any[]) => {
      this.item = res;
      this.recentTransactionsDataSource.data = this.item;
      console.log(res);
  });
  }

  trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
