import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ScrumboardService } from 'app/modules/options/scrum-board/scrumboard.service';
import { Board, Card, List } from 'app/modules/options/scrum-board/scrumboard.models';

@Component({
    selector       : 'scrumboard-board',
    templateUrl    : './board.component.html',
    styleUrls      : ['./board.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrumboardBoardComponent implements OnInit, OnDestroy
{
    board: Board;
    listTitleForm: FormGroup;

    // Private
    private readonly _positionStep: number = 65536;
    private readonly _maxListCount: number = 200;
    private readonly _maxPosition: number = this._positionStep * 500;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _scrumboardService: ScrumboardService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Initialize the list title form
        this.listTitleForm = this._formBuilder.group({
            title: ['']
        });

       this.board = {
        "id": "2c82225f-2a6c-45d3-b18a-1132712a4234",
        "title": "Admin Dashboard",
        "description": "Roadmap for the new project",
        "icon": "heroicons_outline:template",
        "lastActivity": "2022-04-03T05:00:00.000Z",
        "lists": [
            {
                "id": "a2df7786-519c-485a-a85f-c09a61cc5f37",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "position": 65536,
                "title": "To do",
                "cards": [
                    {
                        "id": "e74e66e9-fe0f-441e-a8ce-28ed6eccc48d",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "a2df7786-519c-485a-a85f-c09a61cc5f37",
                        "position": 65536,
                        "title": "Example that showcase all of the available bits on the card with a fairly long title compared to other cards",
                        "description": "Example that showcase all of the available bits on the card with a fairly long title compared to other cards. Example that showcase all of the available bits on the card with a fairly long title compared to other cards.",
                        "labels": [
                            {
                                "id": "e0175175-2784-48f1-a519-a1d2e397c9b3",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Research"
                            },
                            {
                                "id": "51779701-818a-4a53-bc16-137c3bd7a564",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Wireframing"
                            },
                            {
                                "id": "e8364d69-9595-46ce-a0f9-ce428632a0ac",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Design"
                            },
                            {
                                "id": "caff9c9b-a198-4564-b1f4-8b3df1d345bb",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Development"
                            },
                            {
                                "id": "f9eeb436-13a3-4208-a239-0d555960a567",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Bug"
                            }
                        ],
                        "dueDate": "2022-03-25T05:00:00.000Z"
                    },
                    {
                        "id": "ed58add1-45a7-41db-887d-3ca7ee7f2719",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "a2df7786-519c-485a-a85f-c09a61cc5f37",
                        "position": 131072,
                        "title": "Do a research about most needed admin applications",
                        "description": null,
                        "labels": [
                            {
                                "id": "e0175175-2784-48f1-a519-a1d2e397c9b3",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Research"
                            }
                        ],
                        "dueDate": null
                    },
                    {
                        "id": "cd6897cb-acfd-4016-8b53-3f66a5b5fc68",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "a2df7786-519c-485a-a85f-c09a61cc5f37",
                        "position": 196608,
                        "title": "Implement the Project dashboard",
                        "description": null,
                        "labels": [
                            {
                                "id": "caff9c9b-a198-4564-b1f4-8b3df1d345bb",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Development"
                            }
                        ],
                        "dueDate": "2022-04-04T05:00:00.000Z"
                    },
                    {
                        "id": "6da8747f-b474-4c9a-9eba-5ef212285500",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "a2df7786-519c-485a-a85f-c09a61cc5f37",
                        "position": 262144,
                        "title": "Implement the Analytics dashboard",
                        "description": null,
                        "labels": [
                            {
                                "id": "caff9c9b-a198-4564-b1f4-8b3df1d345bb",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Development"
                            }
                        ],
                        "dueDate": "2022-04-03T05:00:00.000Z"
                    }
                ]
            },
            {
                "id": "83ca2a34-65af-49c0-a42e-94a34003fcf2",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "position": 131072,
                "title": "In progress",
                "cards": [
                    {
                        "id": "94fb1dee-dd83-4cca-acdd-02e96d3cc4f1",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "83ca2a34-65af-49c0-a42e-94a34003fcf2",
                        "position": 65536,
                        "title": "Analytics dashboard design",
                        "description": null,
                        "labels": [
                            {
                                "id": "e8364d69-9595-46ce-a0f9-ce428632a0ac",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Design"
                            }
                        ],
                        "dueDate": null
                    },
                    {
                        "id": "fc16f7d8-957d-43ed-ba85-20f99b5ce011",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "83ca2a34-65af-49c0-a42e-94a34003fcf2",
                        "position": 131072,
                        "title": "Project dashboard design",
                        "description": null,
                        "labels": [
                            {
                                "id": "e8364d69-9595-46ce-a0f9-ce428632a0ac",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Design"
                            }
                        ],
                        "dueDate": null
                    }
                ]
            },
            {
                "id": "a85ea483-f8f7-42d9-a314-3fed6aac22ab",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "position": 196608,
                "title": "In review",
                "cards": [
                    {
                        "id": "c0b32f1f-64ec-4f8d-8b11-a8dc809df331",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "a85ea483-f8f7-42d9-a314-3fed6aac22ab",
                        "position": 65536,
                        "title": "JWT Auth implementation",
                        "description": null,
                        "labels": [
                            {
                                "id": "caff9c9b-a198-4564-b1f4-8b3df1d345bb",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Development"
                            }
                        ],
                        "dueDate": null
                    }
                ]
            },
            {
                "id": "34cbef38-5687-4813-bd66-141a6df6d832",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "position": 262144,
                "title": "Completed",
                "cards": [
                    {
                        "id": "532c2747-be79-464a-9897-6a682bf22b64",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "34cbef38-5687-4813-bd66-141a6df6d832",
                        "position": 65536,
                        "title": "Create low fidelity wireframes",
                        "description": null,
                        "labels": [],
                        "dueDate": null
                    },
                    {
                        "id": "1d908efe-c830-476e-9e87-d06e30d89bc2",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "34cbef38-5687-4813-bd66-141a6df6d832",
                        "position": 131072,
                        "title": "Create high fidelity wireframes",
                        "description": null,
                        "labels": [],
                        "dueDate": "2022-03-25T05:00:00.000Z"
                    },
                    {
                        "id": "b1da11ed-7896-4826-962d-4b7b718896d4",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "34cbef38-5687-4813-bd66-141a6df6d832",
                        "position": 196608,
                        "title": "Collect information about most used admin layouts",
                        "description": null,
                        "labels": [
                            {
                                "id": "e0175175-2784-48f1-a519-a1d2e397c9b3",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Research"
                            }
                        ],
                        "dueDate": null
                    },
                    {
                        "id": "3b7f3ceb-107f-42bc-a204-c268c9a56cb4",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "34cbef38-5687-4813-bd66-141a6df6d832",
                        "position": 262144,
                        "title": "Do a research about latest UI trends",
                        "description": null,
                        "labels": [
                            {
                                "id": "e0175175-2784-48f1-a519-a1d2e397c9b3",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Research"
                            }
                        ],
                        "dueDate": null
                    },
                    {
                        "id": "cd7f01c5-a941-4076-8cef-37da0354e643",
                        "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                        "listId": "34cbef38-5687-4813-bd66-141a6df6d832",
                        "position": 327680,
                        "title": "Learn more about UX",
                        "description": null,
                        "labels": [
                            {
                                "id": "e0175175-2784-48f1-a519-a1d2e397c9b3",
                                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                                "title": "Research"
                            }
                        ],
                        "dueDate": null
                    }
                ]
            }
        ],
        "labels": [
            {
                "id": "e0175175-2784-48f1-a519-a1d2e397c9b3",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "title": "Research"
            },
            {
                "id": "51779701-818a-4a53-bc16-137c3bd7a564",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "title": "Wireframing"
            },
            {
                "id": "e8364d69-9595-46ce-a0f9-ce428632a0ac",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "title": "Design"
            },
            {
                "id": "caff9c9b-a198-4564-b1f4-8b3df1d345bb",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "title": "Development"
            },
            {
                "id": "f9eeb436-13a3-4208-a239-0d555960a567",
                "boardId": "2c82225f-2a6c-45d3-b18a-1132712a4234",
                "title": "Bug"
            }
        ],
        "members": [
            {
                name: '',
                "id": null,
                "avatar": null
            },
            {
                name:'',
                "id": null,
                "avatar": null
            },
            {
                name:'',
                "id": null,
                "avatar": null
            }
        ]
    }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Focus on the given element to start editing the list title
     *
     * @param listTitleInput
     */
    renameList(listTitleInput: HTMLElement): void
    {
        // Use timeout so it can wait for menu to close
        setTimeout(() => {
            listTitleInput.focus();
        });
    }

    /**
     * Add new list
     *
     * @param title
     */
    addList(title: string): void
    {
        debugger
        // Limit the max list count
        if ( this.board.lists.length >= this._maxListCount )
        {
            return;
        }

        // Create a new list model
        const list = new List({
            boardId : this.board.id,
            position: this.board.lists.length ? this.board.lists[this.board.lists.length - 1].position + this._positionStep : this._positionStep,
            title   : title
        });

        // Save the list
        this._scrumboardService.createList(list).subscribe();
    }

    /**
     * Update the list title
     *
     * @param event
     * @param list
     */
    updateListTitle(event: any, list: List): void
    {
        // Get the target element
        const element: HTMLInputElement = event.target;

        // Get the new title
        const newTitle = element.value;

        // If the title is empty...
        if ( !newTitle || newTitle.trim() === '' )
        {
            // Reset to original title and return
            element.value = list.title;
            return;
        }

        // Update the list title and element value
        list.title = element.value = newTitle.trim();

        // Update the list
        this._scrumboardService.updateList(list).subscribe();
    }

    /**
     * Delete the list
     *
     * @param id
     */
    deleteList(id): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete list',
            message: 'Are you sure you want to delete this list and its cards? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {

                // Delete the list
                this._scrumboardService.deleteList(id).subscribe();
            }
        });
    }

    /**
     * Add new card
     */
    addCard(list: List, title: string): void
    {
        // Create a new card model
        const card = new Card({
            boardId : this.board.id,
            listId  : list.id,
            position: list.cards.length ? list.cards[list.cards.length - 1].position + this._positionStep : this._positionStep,
            title   : title
        });

        // Save the card
        this._scrumboardService.createCard(card).subscribe();
    }

    /**
     * List dropped
     *
     * @param event
     */
    listDropped(event: CdkDragDrop<List[]>): void
    {
        // Move the item
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        // Calculate the positions
        const updated = this._calculatePositions(event);

        // Update the lists
        this._scrumboardService.updateLists(updated).subscribe();
    }

    /**
     * Card dropped
     *
     * @param event
     */
    cardDropped(event: CdkDragDrop<Card[]>): void
    {
        // Move or transfer the item
        if ( event.previousContainer === event.container )
        {
            // Move the item
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else
        {
            // Transfer the item
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

            // Update the card's list it
            event.container.data[event.currentIndex].listId = event.container.id;
        }

        // Calculate the positions
        const updated = this._calculatePositions(event);

        // Update the cards
        this._scrumboardService.updateCards(updated).subscribe();
    }

    /**
     * Check if the given ISO_8601 date string is overdue
     *
     * @param date
     */
    isOverdue(date: string): boolean
    {
        return moment(date, moment.ISO_8601).isBefore(moment(), 'days');
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Calculate and set item positions
     * from given CdkDragDrop event
     *
     * @param event
     * @private
     */
    private _calculatePositions(event: CdkDragDrop<any[]>): any[]
    {
        // Get the items
        let items = event.container.data;
        const currentItem = items[event.currentIndex];
        const prevItem = items[event.currentIndex - 1] || null;
        const nextItem = items[event.currentIndex + 1] || null;

        // If the item moved to the top...
        if ( !prevItem )
        {
            // If the item moved to an empty container
            if ( !nextItem )
            {
                currentItem.position = this._positionStep;
            }
            else
            {
                currentItem.position = nextItem.position / 2;
            }
        }
        // If the item moved to the bottom...
        else if ( !nextItem )
        {
            currentItem.position = prevItem.position + this._positionStep;
        }
        // If the item moved in between other items...
        else
        {
            currentItem.position = (prevItem.position + nextItem.position) / 2;
        }

        // Check if all item positions need to be updated
        if ( !Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition )
        {
            // Re-calculate all orders
            items = items.map((value, index) => {
                value.position = (index + 1) * this._positionStep;
                return value;
            });

            // Return items
            return items;
        }

        // Return currentItem
        return [currentItem];
    }
}
