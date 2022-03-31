import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-retro',
  templateUrl: './create-retro.component.html',
  styleUrls: ['./create-retro.component.scss']
})
export class CreateRetroComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  save() {

  }

}
