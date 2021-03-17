import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailDataListingComponent } from './event-detail-data-listing.component';

describe('EventDetailDataListingComponent', () => {
  let component: EventDetailDataListingComponent;
  let fixture: ComponentFixture<EventDetailDataListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailDataListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailDataListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
