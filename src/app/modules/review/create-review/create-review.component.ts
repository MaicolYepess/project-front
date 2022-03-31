import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  gridsize: number = 30;
  constructor(private _formBuilder: FormBuilder, private router: Router) { }

  reviewForm = this._formBuilder.group({
    id: [''],
    sprint: ['', Validators.required],
    observations: [''],
    date: ['', Validators.required],
    levelSatisfaction: ['', Validators.required],
    goalAccomplished: ['', Validators.required],
  });

  ngOnInit(): void {

  }

  save() {
    console.log(this.reviewForm.value);
    
  }

  cerrar() {
    this.router.navigate(['review'])
  }

  updateSetting(event) {
    this.gridsize = event.value;
    this.reviewForm.get('levelSatisfaction').setValue(event.value);
  }

}
