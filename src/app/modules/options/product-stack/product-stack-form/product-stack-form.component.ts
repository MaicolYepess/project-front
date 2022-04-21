import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Item } from 'app/core/models/item';
import swal from 'sweetalert2';
import { ProductStackService } from '../product-stack.service';
import { MatTableDataSource } from '@angular/material/table';
import { SprintServiceService } from '../../sprint/sprint-service.service';

@Component({
    selector: 'app-product-stack-form',
    templateUrl: './product-stack-form.component.html',
    styleUrls: ['./product-stack-form.component.scss'],
})
export class ProductStackFormComponent implements OnInit {
    idProject: string;
    releases: any;
    selectedFiles: any;
    types: any;
    sprints: any;
    closeResult = '';
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
        public matDialogRef: MatDialogRef<ProductStackFormComponent>,
        private _formBuilder: FormBuilder,
        private _productService: ProductStackService,
        private _sprintService: SprintServiceService,
        @Inject(MAT_DIALOG_DATA) public model: Item
    ) {
        if (this.model !== null) {
            const setModel = {
                description: model.description,
                sprintId: model.sprintId,
                type: model.type,
                title: model.title,
                parent: model.parent,
                historyPoints: model.historyPoints,
                assignedUser: model.assignedUser,
                release: model.release,
                criteriaOfAcceptance: model.criteriaOfAcceptance,
                files: model.files
            };
            this.itemForm.setValue(setModel);
        }
    }

    ngOnInit(): void {
        this.idProject =  sessionStorage.getItem("idProject");
        this.getTypes();
        this.getStimation();
        this.getSprints();
        this.getReleases();
        
    }
    itemForm = this._formBuilder.group({
        description: [''],
        sprintId: [null],
        type: ['', Validators.required],
        title: [''],
        parent: [null],
        historyPoints: [null],
        assignedUser: [''],
        release: [null],
        criteriaOfAcceptance: [null],
        files: [null]
    });
    cerrar(): void {
        this.matDialogRef.close();
    }

    selectFile(event) {
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
            this.sprints  = [];
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
            let item: Item = new Item();
            item = this.itemForm.value;
            item.projectId = this.idProject;
            this.saveItem(item);
        }
    }

    update() {
          if (this.itemForm.valid) {
            let item: Item = new Item();
            item = this.itemForm.value;
            item.id = this.model.id;
            item.projectId = this.idProject;
            item.status = this.model.status;
            this.updateItem(item);
        }
    }

    updateItem(item: Item) {
          this._productService.saveItem(item).subscribe(
            (res) => {
                if (res) {
                    this.showMessage(
                        'El Item se actualizó correctamente!.',
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

    saveItem(item: Item) {
        this._productService.saveItem(item).subscribe(
            (res) => {
                if (res) {
                    this.showMessage('El Item se creó correctamente!.', 'info');
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
