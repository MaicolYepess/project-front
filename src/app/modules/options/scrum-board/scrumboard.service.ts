import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Board, Card } from './scrumboard.models';

@Injectable({
  providedIn: 'root'
})
export class ScrumboardService {
// Private
private _board: BehaviorSubject<Board | null>;
private _boards: BehaviorSubject<Board[] | null>;
private _card: BehaviorSubject<Card | null>;

  constructor( private _httpClient: HttpClient) {
    this._board = new BehaviorSubject(null);
    this._boards = new BehaviorSubject(null);
    this._card = new BehaviorSubject(null);
   }


  get boards$(): Observable<Board[]>
    {
        return this._boards.asObservable();
    }


    getBoards(): Observable<Board[]>
    {
        return this._httpClient.get<Board[]>('api/apps/scrumboard/boards').pipe(
            map(response => response.map(item => new Board(item))),
            tap(boards => this._boards.next(boards))
        );
    }

    getBoard(id: string): Observable<Board>
    {
        return this._httpClient.get<Board>('api/apps/scrumboard/board', {params: {id}}).pipe(
            map(response => new Board(response)),
            tap(board => this._board.next(board))
        );
    }

    getCard(id: string): Observable<Card>
    {
        return this._board.pipe(
            take(1),
            map((board) => {

                // Find the card
                const card = board.lists.find(list => list.cards.some(item => item.id === id))
                                  .cards.find(item => item.id === id);

                // Update the card
                this._card.next(card);

                // Return the card
                return card;
            }),
            switchMap((card) => {

                if ( !card )
                {
                    return throwError('Could not found the card with id of ' + id + '!');
                }

                return of(card);
            })
        );
    }

}
