import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReleaseService } from '../release.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-release-form',
    templateUrl: './release-form.component.html',
    styleUrls: ['./release-form.component.scss'],
})
export class ReleaseFormComponent implements OnInit {
    textToggle: string = 'Sin Liberar';
    idProject: string;
    releaseForm: FormGroup;
    constructor(
        public matDialogRef: MatDialogRef<ReleaseFormComponent>,
        private _formBuilder: FormBuilder,
        private _releaseService: ReleaseService,
        @Inject(MAT_DIALOG_DATA) public model: any
    ) {}

    ngOnInit(): void {
        this.idProject =  sessionStorage.getItem("idProject");
        this.releaseForm = this._formBuilder.group({
            description: [''],
            Name: [''],
            estimationDate: [],
            status: [],
            projectId: [this.idProject]
        });
    }

    cerrar(): void {
        this.matDialogRef.close();
    }

   

    update() {
        this.matDialogRef.close(this.releaseForm.value);
    }

    toggleChange(e: any) {
        if (e.checked) {
            this.textToggle = 'Liberado';
        } else {
            this.textToggle = 'Sin Liberar';
        }
    }

    guardar() {
        if (this.releaseForm.valid) {
            let item: any;
            item = this.releaseForm.value;
            this.saveItem(item);
        }
    }

    
    saveItem(item: any) {
        debugger
        this._releaseService.saveRelease(item).subscribe(
            (res) => {
                if (res) {
                    this.showMessage('El Release se creó correctamente!.', 'info');
                    this.matDialogRef.close();
                }
            },
            (error) => {
                console.log(error);
                this.showMessage(
                    'Ocurrió un error, por favor intente de nuevo. ' + error.message,
                    'error'
                );
            }
        );
    }

    showMessage(text: string, icon: any) {
        swal.fire({
            text: text,
            icon: icon,
        }).then((result) => {});
    }
}
