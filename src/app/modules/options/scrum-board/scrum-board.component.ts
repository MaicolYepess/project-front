import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

export class Board {
    constructor(public name: string, public columns: Column[]) {}
}

export class Column {
    constructor(
        public name: string,
        public id: string,
        public tasks: string[]
    ) {}
}

@Component({
    selector: 'app-scrum-board',
    templateUrl: './scrum-board.component.html',
    styleUrls: ['./scrum-board.component.scss'],
})
export class ScrumBoardComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

}
