import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailParticipantsViewComponent } from './event-detail-participants-view.component';

describe('EventDetailParticipantsViewComponent', () => {
  let component: EventDetailParticipantsViewComponent;
  let fixture: ComponentFixture<EventDetailParticipantsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailParticipantsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailParticipantsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
