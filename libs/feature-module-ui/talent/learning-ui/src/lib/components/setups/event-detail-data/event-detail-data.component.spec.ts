import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailDataComponent } from './event-detail-data.component';

describe('EventDetailDataComponent', () => {
  let component: EventDetailDataComponent;
  let fixture: ComponentFixture<EventDetailDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
