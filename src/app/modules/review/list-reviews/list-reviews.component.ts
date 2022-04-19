import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Review } from 'app/core/models/review';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CreateReviewComponent } from '../create-review/create-review.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.scss']
})
export class ListReviewsComponent implements OnInit, AfterViewInit {
  reviews = new MatTableDataSource<Review>([]);
  showCreate = false;
  showDetail = false;
  displayedColumns: string[] = ['sprint', 'observations', 'date', 'levelSatisfaction', 'goalAccomplished', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router,
    private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.reviews.data = [
      {id: '45454', sprint: 'Sprint 1', observations: 'ghtyutyu', date: '28 de febrero de 2022', levelSatisfaction: 9, goalAccomplished: true},
      {id: '45454', sprint: 'Sprint 2', observations: 'ghtyutyu', date: '15 de marzo de 2022', levelSatisfaction: 3, goalAccomplished: false},
      {id: '45454', sprint: 'Sprint 3', observations: 'ghtyutyu', date: '30 de marzo de 2022', levelSatisfaction: 7, goalAccomplished: true}
    ]
  }

  ngAfterViewInit() {
    this.reviews.paginator = this.paginator;
  }

  openAddUser() {
    const dialogRef = this._matDialog.open(CreateReviewComponent, {
      width: '850px',
  });
  dialogRef.afterClosed().subscribe((data) => {
  });
  }

  openUpdate(item) {

  }

  openDetail(item) {
    this.router.navigate(['options/detail']);
  }

}
