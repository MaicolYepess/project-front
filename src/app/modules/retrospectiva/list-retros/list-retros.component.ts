import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Retro } from 'app/core/models/retrospectiva';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-retros',
  templateUrl: './list-retros.component.html',
  styleUrls: ['./list-retros.component.scss']
})
export class ListRetrosComponent implements OnInit {

  retros = new MatTableDataSource<Retro>([]);
  showCreateRetro = false;
  displayedColumns: string[] = ['sprint', 'date', 'positiveAspects', 'negativeAspects', 'aspectsToImprove', 'commitments', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.retros.data = [
      {
        id: '123',
        date: '19/04/2022',
        sprint: 'Sprint 1', 
        positiveAspects: ['aspecto 1', 'aspecto 2', 'aspecto 3'],
        negativeAspects: ['aspecto 1', 'aspecto 2', 'aspecto 3'],
        aspectsToImprove: ['aspecto 1', 'aspecto 2', 'aspecto 3'],
        commitments: [
          {id: '345345', description: 'compromiso 1', compliment: true, responsible: 'Santiago Serna Higuita' },
          {id: '345345', description: 'compromiso 2', compliment: false, responsible: 'Santiago Serna Higuita' },
          {id: '345345', description: 'compromiso 3', compliment: true, responsible: 'Santiago Serna Higuita' }
        ]
      },
      {
        id: '124',
        date: '19/04/2022',
        sprint: 'Sprint 2', 
        positiveAspects: ['aspecto 1', 'aspecto 2', 'aspecto 3'],
        negativeAspects: ['aspecto 1', 'aspecto 2', 'aspecto 3'],
        aspectsToImprove: ['aspecto 1', 'aspecto 2', 'aspecto 3'],
        commitments: [
          {id: '345345', description: 'compromiso 1', compliment: false, responsible: 'Santiago Serna Higuita' },
          {id: '345345', description: 'compromiso 2', compliment: false, responsible: 'Santiago Serna Higuita' },
          {id: '345345', description: 'compromiso 3', compliment: true, responsible: 'Santiago Serna Higuita' }
        ]
      }
    ]
  }

  ngAfterViewInit() {
    this.retros.paginator = this.paginator;
  }

  openAddRetro() {
    this.route.navigate(['retro/create'])
  }

  openUpdate() {

  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.retros.filter = filterValue
        .trim()
        .toLowerCase();
  }

}
