import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailCloseComponent } from './event-detail-close.component';

describe('EventDetailCloseComponent', () => {
  let component: EventDetailCloseComponent;
  let fixture: ComponentFixture<EventDetailCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
