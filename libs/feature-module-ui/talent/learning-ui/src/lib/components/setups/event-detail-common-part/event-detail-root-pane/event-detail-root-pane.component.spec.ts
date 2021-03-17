import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailRootPaneComponent } from './event-detail-root-pane.component';

describe('EventDetailRootPaneComponent', () => {
  let component: EventDetailRootPaneComponent;
  let fixture: ComponentFixture<EventDetailRootPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailRootPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailRootPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
