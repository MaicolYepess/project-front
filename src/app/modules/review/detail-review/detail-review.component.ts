import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.scss']
})
export class DetailReviewComponent implements OnInit {

  sprint = {id: '45454', sprint: 'Sprint 1', observations: 'ghtyutyu', date: '28 de febrero de 2022', levelSatisfaction: 9, goalAccomplished: true};
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backList() {
    this.router.navigate(['review'])
  }

}
