import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailPreRequisitesEditorComponent } from './event-detail-pre-requisites-editor.component';

describe('EventDetailPreRequisitesEditorComponent', () => {
  let component: EventDetailPreRequisitesEditorComponent;
  let fixture: ComponentFixture<EventDetailPreRequisitesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailPreRequisitesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailPreRequisitesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
