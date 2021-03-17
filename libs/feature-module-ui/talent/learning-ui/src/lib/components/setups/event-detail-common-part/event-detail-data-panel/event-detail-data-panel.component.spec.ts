import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailDataPanelComponent } from './event-detail-data-panel.component';

describe('EventDetailDataPanelComponent', () => {
  let component: EventDetailDataPanelComponent;
  let fixture: ComponentFixture<EventDetailDataPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailDataPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailDataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
