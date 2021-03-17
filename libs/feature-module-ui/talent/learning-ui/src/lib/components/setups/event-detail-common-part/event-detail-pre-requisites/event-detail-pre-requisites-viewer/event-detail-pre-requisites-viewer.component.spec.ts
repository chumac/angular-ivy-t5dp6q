import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailPreRequisitesViewerComponent } from './event-detail-pre-requisites-viewer.component';

describe('EventDetailPreRequisitesViewerComponent', () => {
  let component: EventDetailPreRequisitesViewerComponent;
  let fixture: ComponentFixture<EventDetailPreRequisitesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailPreRequisitesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailPreRequisitesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
