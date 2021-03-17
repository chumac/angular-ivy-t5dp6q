import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFacilitatorsEditorComponent } from './event-detail-facilitators-editor.component';

describe('EventDetailFacilitatorsEditorComponent', () => {
  let component: EventDetailFacilitatorsEditorComponent;
  let fixture: ComponentFixture<EventDetailFacilitatorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailFacilitatorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailFacilitatorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
