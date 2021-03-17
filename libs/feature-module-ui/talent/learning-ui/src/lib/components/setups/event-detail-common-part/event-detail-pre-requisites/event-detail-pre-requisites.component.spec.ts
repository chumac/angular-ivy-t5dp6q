import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailPreRequisitesComponent } from './event-detail-pre-requisites.component';

describe('EventDetailPreRequisitesComponent', () => {
  let component: EventDetailPreRequisitesComponent;
  let fixture: ComponentFixture<EventDetailPreRequisitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailPreRequisitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailPreRequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
