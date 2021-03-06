import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductStackService } from '../../product-stack/product-stack.service';
import swal from 'sweetalert2';
import { SprintServiceService } from '../../sprint/sprint-service.service';

@Component({
  selector: 'app-new-history-form',
  templateUrl: './new-history-form.component.html',
  styleUrls: ['./new-history-form.component.scss']
})
export class NewHistoryFormComponent implements OnInit {
  idProject: string;
    releases: any;
    selectedFiles: any;
    types: any;
    sprints: any;
    closeResult = '';
    itemForm: FormGroup;
    estmation: any;
    dataInTable: boolean = false;
    historyPointActivate: boolean = false;
    recentTransactionsDataSource: MatTableDataSource<any> =
        new MatTableDataSource();
    recentTransactionsTableColumns: string[] = [
        'actions',
        'state',
        'description',
    ];
    constructor(
        public matDialogRef: MatDialogRef<NewHistoryFormComponent>,
        private _formBuilder: FormBuilder,
        private _productService: ProductStackService,
        private _sprintService: SprintServiceService,
        @Inject(MAT_DIALOG_DATA) public model: any
    ) {}

    ngOnInit(): void {
        this.idProject =  sessionStorage.getItem("idProject");
        this.getTypes();
        this.getStimation();
        this.getSprints();
        this.getReleases();
        this.itemForm = this._formBuilder.group({
            type: ['', Validators.required],
        });
    }

    cerrar(): void {
        this.matDialogRef.close();
    }

    selectFile(event) {
        debugger;
        this.selectedFiles = event.target.files;
    }

    getReleases() {
         this._productService.getReleases('').subscribe((res: any[]) => {
             this.releases = res;
         });
    }

    getSprints(){
        this._sprintService.getSprintsProject(this.idProject).subscribe((res: any[]) => {
            this.sprints = res;
        },
        (error) => {
            this.sprints = [];
        });
    }

    changeOption(e: any) {
        if (e.value == '0925d1b7-8e12-4171-a72e-6fa61f49f4a1') {
            this.historyPointActivate = true;
        }else{
            this.historyPointActivate = false;
        }
    }

    getTypes() {
        this._productService.getTypes().subscribe((res: any[]) => {
            this.types = res;
        });
    }

    getStimation() {
        this._productService.getEstimation().subscribe((res: any[]) => {
            this.estmation = res;
        });
    }

    guardar() {
        if (this.itemForm.valid) {
            let item: any;
            item = this.itemForm.value;
            this.saveItem(item);
        }
    }

    update() {
        //   debugger
        //   if (this.projectForm.valid) {
        //    let project: Project = new Project();
        //         project.projectName = this.projectForm.value.projectName;
        //         project.description = this.projectForm.value.description;
        //         project.estimationMethod= this.projectForm.value.estimationMethod;
        //         project.startDate= this.projectForm.value.startDate;
        //         project.endDate= this.projectForm.value.endDate;
        //         project.multipleActiveSprints= this.projectForm.value.multipleActiveSprints;
        //         project.manageTime= this.projectForm.value.manageTime;
        //         project.companyId= this.projectForm.value.companyId;
        //         project.id= this.model.id;
        //        this.updateProject(project);
        // }
    }

    updateProject(item: any) {
        //   this.projectService.updateProject(project).subscribe(
        //     (res) => {
        //         if (res) {
        //             this.showMessage(
        //                 'El Proyecto se actualiz?? correctamente!.',
        //                 'info'
        //             );
        //             this.matDialogRef.close();
        //         }
        //     },
        //     (error) => {
        //         console.log(error);
        //         this.showMessage(
        //             'Ocurri?? un error, por favor intente de nuevo.',
        //             'error'
        //         );
        //     }
        // );
    }

    saveItem(item: any) {
        debugger
        this._productService.saveItem(item).subscribe(
            (res) => {
                if (res) {
                    this.showMessage('El Item se cre?? correctamente!.', 'info');
                    this.matDialogRef.close();
                }
            },
            (error) => {
                console.log(error);
                this.showMessage(
                    'Ocurri?? un error, por favor intente de nuevo. ' + error.message,
                    'error'
                );
            }
        );
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
