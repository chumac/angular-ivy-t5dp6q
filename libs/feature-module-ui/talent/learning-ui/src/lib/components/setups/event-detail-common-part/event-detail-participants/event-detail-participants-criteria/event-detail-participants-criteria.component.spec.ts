import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailParticipantsCriteriaComponent } from './event-detail-participants-criteria.component';

describe('EventDetailParticipantsCriteriaComponent', () => {
  let component: EventDetailParticipantsCriteriaComponent;
  let fixture: ComponentFixture<EventDetailParticipantsCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailParticipantsCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailParticipantsCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
