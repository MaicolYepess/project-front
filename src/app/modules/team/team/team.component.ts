import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TeamMate } from 'app/core/models/team-mate';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, AfterViewInit {

  members = new MatTableDataSource<TeamMate>([]);
  configForm: FormGroup;
  displayedColumns: string[] = ['name', 'date', 'role', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _fuseConfirmationService: FuseConfirmationService, private _formBuilder: FormBuilder) { }

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
      {id: '45454', name: 'Julián Sandoval', email: 'julian.sandoval@esu.com.co', date: '30 de marzo de 2022', role: '1'},
      {id: '45454', name: 'Santiago Serna', email: 'santiago.serna@esu.com.co', date: '30 de marzo de 2022', role: '2'},
      {id: '45454', name: 'Alejandro Sarmiento', email: 'alejandro.sarmiento@esu.com.co', date: '15 de marzo de 2022', role: '2'},
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

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
