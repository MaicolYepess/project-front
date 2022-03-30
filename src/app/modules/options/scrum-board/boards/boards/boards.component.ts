import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Board } from '../../scrumboard.models';
import { Subject, takeUntil } from 'rxjs';
import { ScrumboardService } from '../../scrumboard.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  boards: Board[];

  // Private
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(  private _changeDetectorRef: ChangeDetectorRef,
    private _scrumboardService: ScrumboardService) { }

  ngOnInit(): void {
debugger
    this._scrumboardService.boards$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((boards: Board[]) => {
        this.boards = boards;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
  }


  trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

}
