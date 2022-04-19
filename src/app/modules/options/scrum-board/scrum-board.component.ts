import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

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
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrumboardComponent {
    
    constructor() {}

}
