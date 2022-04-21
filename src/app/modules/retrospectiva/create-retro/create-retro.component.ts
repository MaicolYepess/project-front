import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Retro } from 'app/core/models/retrospectiva';
import { MatDialog } from '@angular/material/dialog';
import { CreateCommitmentComponent } from '../create-commitment/create-commitment.component';

@Component({
  selector: 'app-create-retro',
  templateUrl: './create-retro.component.html',
  styleUrls: ['./create-retro.component.scss']
})
export class CreateRetroComponent implements OnInit {

  groups: Retro = {
    id: '1',
    date: '',
    sprint: '',
    positiveAspects: [
      
    ],
    negativeAspects: [],
    aspectsToImprove: [],
    commitments: []
  };

  constructor(private router: Router, private _matDialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  save() {

  }

  dropItem(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  addCard(group, description: string): void {
    group.push(description);
  }

  updateCommitments(commitment, index) {
    const dialogRef = this._matDialog.open(
      CreateCommitmentComponent, {data: commitment});
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.groups.commitments[index] = result;
        }
    });
  }

  addCommitment() {
    const dialogRef = this._matDialog.open(
      CreateCommitmentComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.groups.commitments.push(result);
        }
    });
  }


}
