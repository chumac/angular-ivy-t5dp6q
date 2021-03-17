import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFacilitatorsViewerComponent } from './event-detail-facilitators-viewer.component';

describe('EventDetailFacilitatorsViewerComponent', () => {
  let component: EventDetailFacilitatorsViewerComponent;
  let fixture: ComponentFixture<EventDetailFacilitatorsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailFacilitatorsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailFacilitatorsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
