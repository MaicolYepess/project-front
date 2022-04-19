import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReleaseService } from '../release.service';
import swal from 'sweetalert2';
import { Release } from 'app/core/models/release';

@Component({
    selector: 'app-release-form',
    templateUrl: './release-form.component.html',
    styleUrls: ['./release-form.component.scss'],
})
export class ReleaseFormComponent implements OnInit {
    idProject: string;
    constructor(
        public matDialogRef: MatDialogRef<ReleaseFormComponent>,
        private _formBuilder: FormBuilder,
        private _releaseService: ReleaseService,
        @Inject(MAT_DIALOG_DATA) public model: Release
    ) {
        if (this.model !== null) {
            const setModel = {
                description: model.description,
                Name: model.name,
                estimationDate: model.estimationDate,
                status: model.status,
                projectId: [this.idProject]
            };
            this.releaseForm.setValue(setModel);
        }
    }

    ngOnInit(): void {
        this.idProject =  sessionStorage.getItem("idProject");
        
    }

    releaseForm = this._formBuilder.group({
        description: [''],
        Name: [''],
        estimationDate: [''],
        status: [''],
        projectId: ['']
    });

    cerrar(): void {
        this.matDialogRef.close();
    }

   

    update() {
        if (this.releaseForm.valid) {
            let item: Release;
            item = this.releaseForm.value;
            this.updateItem(item);
        }
    }
    guardar() {
        if (this.releaseForm.valid) {
            let item:  Release;
            item = this.releaseForm.value;
            this.saveItem(item);
        }
    }

    saveItem(item: Release) {
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

    updateItem(item: Release) {
        this._releaseService.updateRelease(item).subscribe(
            (res) => {
                if (res) {
                    this.showMessage('El Release se creó correctamente!.', 'info');
                    this.matDialogRef.close('Ok');
                }
            },
            (error) => {
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
