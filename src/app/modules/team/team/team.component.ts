import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TeamMate } from 'app/core/models/team-mate';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SendInviteComponent } from '../send-invite/send-invite.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, AfterViewInit {

  members = new MatTableDataSource<TeamMate>([]);
  configForm: FormGroup;
  displayedColumns: string[] = ['name', 'email', 'date', 'role', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _fuseConfirmationService: FuseConfirmationService, private _formBuilder: FormBuilder,
              private _matDialog: MatDialog) { }

  ngOnInit(): void {
    this.configForm = this._formBuilder.group({
      title      : 'Eliminar integrante',
      message    : '¿Está seguro de eliminar este integrante?',
      icon       : this._formBuilder.group({
          show : true,
          name : 'heroicons_outline:exclamation',
          color: 'warn'
      }),
      actions    : this._formBuilder.group({
          confirm: this._formBuilder.group({
              show : true,
              label: 'Eliminar',
              color: 'warn'
          }),
          cancel : this._formBuilder.group({
              show : true,
              label: 'Cancelar'
          })
      }),
      dismissible: true
    });
    this.members.data = [
      {id: '45454', name: 'Julián Sandoval', email: 'julian.sandoval@esu.com.co', date: '30 de marzo de 2022', role: 'Scrum master'},
      {id: '45454', name: 'Santiago Serna', email: 'santiago.serna@esu.com.co', date: '30 de marzo de 2022', role: 'Desarrollador'},
      {id: '45454', name: 'Alejandro Sarmiento', email: 'alejandro.sarmiento@esu.com.co', date: '15 de marzo de 2022', role: 'Desarrollador'},
    ]
  }

  ngAfterViewInit() {
    this.members.paginator = this.paginator;
  } 

  openConfirmationDialog(e:TeamMate): void
  {
      const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

      dialogRef.afterClosed().subscribe((result) => {
          if (result === 'confirmed') {
              
          }
      });
  }

  openAddUser() {
    const dialogRef = this._matDialog.open(
        SendInviteComponent);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}
