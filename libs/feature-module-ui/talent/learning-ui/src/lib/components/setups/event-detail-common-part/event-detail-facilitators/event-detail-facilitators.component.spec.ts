import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFacilitatorsComponent } from './event-detail-facilitators.component';

describe('EventDetailFacilitatorsComponent', () => {
  let component: EventDetailFacilitatorsComponent;
  let fixture: ComponentFixture<EventDetailFacilitatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailFacilitatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailFacilitatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
