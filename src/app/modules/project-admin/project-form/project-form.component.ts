import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'app/core/models/proyect';
import { ProjectService } from '../project.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
    //projectForm: FormGroup;
    nameImg: any;
    stimation: any;
    companies: any[] = [];
    @Output() companieSaved = new EventEmitter();
    constructor(
        public matDialogRef: MatDialogRef<ProjectFormComponent>,
        private _formBuilder: FormBuilder,
        private projectService: ProjectService,
        @Inject(MAT_DIALOG_DATA) public model: Project
    ) {
        if (this.model !== null) {
            const setModel = {
                projectName: model.projectName,
                description: model.description,
                estimationMethod: model.estimationMethod,
                startDate: new Date(model.startDate),
                endDate: new Date(model.endDate),
                multipleActiveSprints: model.multipleActiveSprints,
                manageTime: model.manageTime,
                companyId: model.companyId,
                id: model.id,
            };
            this.projectForm.setValue(setModel);
        }
    }

    projectForm = this._formBuilder.group({
        projectName: ['', Validators.required],
        description: ['', Validators.required],
        estimationMethod: [''],
        startDate: [''],
        endDate: [''],
        multipleActiveSprints: [false],
        manageTime: [false],
        companyId: [],
        id: [''],
    });
    ngOnInit(): void {
       setTimeout(() => {
        this.getCompanies();
       }, 50000);
        this.getStimationMethod();
    }

    cerrar(): void {
        this.matDialogRef.close();
    }

    getCompanies() {
        this.projectService.getCompanies().subscribe((res: any[]) => {
            this.companies = res;          
        });
    }

    guardar() {
        if (this.projectForm.valid) {
            let project: Project = new Project();
            project.projectName = this.projectForm.value.projectName;
            project.description = this.projectForm.value.description;
            project.estimationMethod = this.projectForm.value.estimationMethod;
            var fechaIni = this.convertDate(this.projectForm.value.startDate);
            var FechaFin = this.convertDate(this.projectForm.value.endDate);
            project.startDate = new Date(fechaIni);
            project.endDate = new Date(FechaFin);
            project.multipleActiveSprints =
                this.projectForm.value.multipleActiveSprints;
            project.manageTime = this.projectForm.value.manageTime;
            project.companyId = 1012365874;
            console.log(project);
            this.saveCompany(project);
        }
    }

    update() {
        if (this.projectForm.valid) {
            let project: Project = new Project();
            project.projectName = this.projectForm.value.projectName;
            project.description = this.projectForm.value.description;
            project.estimationMethod = this.projectForm.value.estimationMethod;
            project.startDate = this.projectForm.value.startDate;
            project.endDate = this.projectForm.value.endDate;
            project.multipleActiveSprints =
                this.projectForm.value.multipleActiveSprints;
            project.manageTime = this.projectForm.value.manageTime;
            project.companyId = this.projectForm.value.companyId;
            project.id = this.model.id;
            this.updateProject(project);
        }
    }

    updateProject(project: Project) {
        this.projectService.updateProject(project).subscribe(
            (res) => {
                if (res) {
                    this.showMessage(
                        'El Proyecto se actualizó correctamente!.',
                        'info'
                    );
                    this.matDialogRef.close();
                }
            },
            (error) => {
                console.log(error);
                this.showMessage(
                    'Ocurrió un error, por favor intente de nuevo.',
                    'error'
                );
            }
        );
    }

    saveCompany(project: Project) {
        this.projectService.saveProject(project).subscribe(
            (res) => {
                if (res) {
                    this.showMessage(
                        'El proyecto se creó correctamente!.',
                        'info'
                    );
                    this.matDialogRef.close();
                }
            },
            (error) => {
                console.log(error);
                this.showMessage(
                    'Ocurrió un error, por favor intente de nuevo.',
                    'error'
                );
            }
        );
    }

    getStimationMethod() {
        this.projectService.getStimationMethod().subscribe((res: any[]) => {
            this.stimation = res;
        });
    }

    convertDate(dateTime: any) {
        var date = new Date(dateTime),
            mnth = ('0' + (date.getMonth() + 1)).slice(-2),
            day = ('0' + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join('-');
    }

    showMessage(text: string, icon: any) {
        swal.fire({
            text: text,
            icon: icon,
        }).then((result) => {});
    }
}
