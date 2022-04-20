import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Commitment } from 'app/core/models/retrospectiva';

@Component({
  selector: 'app-create-commitment',
  templateUrl: './create-commitment.component.html',
  styleUrls: ['./create-commitment.component.scss']
})
export class CreateCommitmentComponent {

  constructor(public matDialogRef: MatDialogRef<CreateCommitmentComponent>, private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public model: Commitment) {
                if (this.model !== null) {
                  const setModel = {
                    description: model.description,
                    compliment: model.compliment,
                    responsible: model.responsible
                  };
                  this.commitmentForm.setValue(setModel);
              }
              }

  commitmentForm = this._formBuilder.group({
    description: ['', Validators.required],
    compliment: [null, Validators.required],
    responsible: [null, Validators.required]
  });
  
  save() {
    if (this.commitmentForm.valid) {
      this.matDialogRef.close(
        { id: '',
          description: this.commitmentForm.value.description,
          responsible: this.commitmentForm.value.responsible,
          compliment: this.commitmentForm.value.compliment
        });
    }
  }

  cerrar(): void {
    this.matDialogRef.close();
  }

}
