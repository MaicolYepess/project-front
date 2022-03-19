import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'app/core/models/item';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-stack-form',
  templateUrl: './product-stack-form.component.html',
  styleUrls: ['./product-stack-form.component.scss']
})
export class ProductStackFormComponent implements OnInit {


  itemForm = this._formBuilder.group({
    projectId: ['', Validators.required],
    description: ['', Validators.required],
    sprintId: [''],
    type: [''],
    title: [''],
    parent: [false],
    historyPoints: [false],
    assignedUser:[''],
    id:[''],
    release: [''],
    criteriaOfAcceptance: [''],
    files: ['']
   });


  constructor(public matDialogRef: MatDialogRef<ProductStackFormComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public model: Item) { }

  ngOnInit(): void {
  }

  cerrar(): void {
    this.matDialogRef.close();
}

getItems() {
//  this.projectService.getCompanies().subscribe((res: any[]) => {
//      this.companies = res;
//  });
}

guardar() {
    // if (this.projectForm.valid) {
    //  let project: Project = new Project();
    //     project.projectName = this.projectForm.value.projectName;
    //     project.description = this.projectForm.value.description;
    //     project.estimationMethod= this.projectForm.value.estimationMethod;
    //     var fechaIni = this.convertDate(this.projectForm.value.startDate);
    //     var FechaFin = this.convertDate(this.projectForm.value.endDate);
    //     project.startDate= new Date(fechaIni);
    //     project.endDate= new Date(FechaFin);
    //     project.multipleActiveSprints= this.projectForm.value.multipleActiveSprints;
    //     project.manageTime= this.projectForm.value.manageTime;
    //     project.companyId= this.projectForm.value.companyId;
    //     console.log(project);
    //     this.saveCompany(project);
    // }
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

updateProject(project: Item) {
//   this.projectService.updateProject(project).subscribe(
//     (res) => {
//         if (res) {
//             this.showMessage(
//                 'El Proyecto se actualizó correctamente!.',
//                 'info'
//             );
//             this.matDialogRef.close();
//         }
//     },
//     (error) => {
//         console.log(error);
//         this.showMessage(
//             'Ocurrió un error, por favor intente de nuevo.',
//             'error'
//         );
//     }
// );
}

saveCompany(project: Item) {
    // this.projectService.saveProject(project).subscribe(
    //     (res) => {
    //         if (res) {
    //             this.showMessage(
    //                 'El proyecto se creó correctamente!.',
    //                 'info'
    //             );
    //             this.matDialogRef.close();
    //         }
    //     },
    //     (error) => {
    //         console.log(error);
    //         this.showMessage(
    //             'Ocurrió un error, por favor intente de nuevo.',
    //             'error'
    //         );
    //     }
    // );
}

convertDate(dateTime: any) {
 var date = new Date(dateTime),
   mnth = ("0" + (date.getMonth() + 1)).slice(-2),
   day = ("0" + date.getDate()).slice(-2);
 return [date.getFullYear(), mnth, day].join("-");
}

showMessage(text: string, icon: any) {
   swal.fire({
       text: text,
       icon: icon,
   }).then((result) => {});
}

}
