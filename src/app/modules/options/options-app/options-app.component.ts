import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-options-app',
    templateUrl: './options-app.component.html',
    styleUrls: ['./options-app.component.scss'],
})
export class OptionsAppComponent implements OnInit {
    idProject: any;

    constructor(private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.idProject = this.router.snapshot.paramMap.get('id') || 'null';
        sessionStorage.setItem("idProject", this.idProject);
    }
}
