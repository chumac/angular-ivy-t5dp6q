import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailParticipantsEditorComponent } from './event-detail-participants-editor.component';

describe('EventDetailParticipantsEditorComponent', () => {
  let component: EventDetailParticipantsEditorComponent;
  let fixture: ComponentFixture<EventDetailParticipantsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailParticipantsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailParticipantsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
