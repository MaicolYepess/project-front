import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRetrosComponent } from './list-retros.component';

describe('ListRetrosComponent', () => {
  let component: ListRetrosComponent;
  let fixture: ComponentFixture<ListRetrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRetrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRetrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
