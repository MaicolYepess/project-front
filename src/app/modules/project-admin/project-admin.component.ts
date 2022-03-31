import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'app/core/models/proyect';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectService } from './project.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-project-admin',
    templateUrl: './project-admin.component.html',
    styleUrls: ['./project-admin.component.scss'],
})
export class ProjectAdminComponent implements OnInit {
    projects: Project[] = [];
    configForm: FormGroup;
    constructor(
        private _matDialog: MatDialog,
        private projectService: ProjectService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.configForm = this._formBuilder.group({
            title: 'Eliminar Empresa',
            message:
                'Are you sure you want to remove this company permanently? <span class="font-medium">This action cannot be undone!</span>',
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warn',
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Remove',
                    color: 'warn',
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Cancel',
                }),
            }),
            dismissible: true,
        });
        this.getProjects();
    }

    getProjects() {
        this.projectService.getProjects().subscribe((res: any[]) => {
            this.projects = res;
        });
    }

    openAddEmpresa(): void {
        const dialogRef = this._matDialog.open(ProjectFormComponent);
        dialogRef.afterClosed().subscribe((result) => {
            this.getProjects();
        });
    }

    openUpdate(e: any) {
        let model: Project[] = e;
        const dialogRef = this._matDialog.open(ProjectFormComponent, {
            data: model,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.getProjects();
        });
    }

    openConfirmationDialog(e: any): void {
        const dialogRef = this._fuseConfirmationService.open(
            this.configForm.value
        );
        dialogRef.afterClosed().subscribe((result) => {
            this.projectService
                .deleteProject(e.id)
                .subscribe((res: Project[]) => {
                    this.projects = res;
                    this.getProjects();
                });
        });
    }
}
