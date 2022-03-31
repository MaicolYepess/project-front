import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.scss']
})
export class SendInviteComponent {

  constructor(public matDialogRef: MatDialogRef<SendInviteComponent>, private _formBuilder: FormBuilder) { }

  userForm = this._formBuilder.group({
    email: ['', Validators.email],
    role: ['', Validators.required]
  });
  
  save() {

  }

  cerrar(): void {
    this.matDialogRef.close();
  }

}
