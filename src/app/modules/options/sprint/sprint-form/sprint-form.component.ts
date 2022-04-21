import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SprintServiceService } from '../sprint-service.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-sprint-form',
    templateUrl: './sprint-form.component.html',
    styleUrls: ['./sprint-form.component.scss'],
})
export class SprintFormComponent implements OnInit {
    impedimentText: string = 'No';
    workEndWeekText: string = 'No';
    idProject: string;
    lastId: any;
    criteriaForm: FormGroup;
    constructor(
        public matDialogRef: MatDialogRef<SprintFormComponent>,
        private _formBuilder: FormBuilder,
        private sprintService: SprintServiceService,
        @Inject(MAT_DIALOG_DATA) public model: any
    ) {}

    ngOnInit(): void {
        debugger
        this.idProject = sessionStorage.getItem('idProject');
        if (parseInt(sessionStorage.getItem('lastId'))) {
            this.lastId = parseInt(sessionStorage.getItem('lastId')) + 1;
        } else {
            this.lastId = 1;
        }
        this.criteriaForm = this._formBuilder.group({
            name: [this.lastId],
            description: ['', Validators.required],
            startDate: [''],
            endDate: [''],
            reviewDate: [''],
            retrospectiveDate: [''],
            projectId: [this.idProject],
            totalEstimate: [null],
        });
    }

    cerrar(): void {
        this.matDialogRef.close();
    }

    guardar() {
        if (this.criteriaForm.valid) {
            let sprint: any;
            sprint = this.criteriaForm.value;
            sprint.id = {
                id: this.lastId,
                projectId: this.idProject,
            };
            this.saveSprint(sprint);
        }
    }

    saveSprint(sprint: any) {
        this.sprintService.saveSprint(sprint).subscribe(
            (res) => {
                if (res) {
                    this.showMessage(
                        'El Sprint se creó correctamente!.',
                        'info'
                    );
                    this.matDialogRef.close();
                }
            },
            (error) => {
                console.log(error);
                this.showMessage(
                    'Ocurrió un error, por favor intente de nuevo. ' +
                        error.message,
                    'error'
                );
            }
        );
    }

    update() {
        this.matDialogRef.close(this.criteriaForm.value);
    }

    showMessage(text: string, icon: any) {
        swal.fire({
            text: text,
            icon: icon,
        }).then((result) => {});
    }
}
