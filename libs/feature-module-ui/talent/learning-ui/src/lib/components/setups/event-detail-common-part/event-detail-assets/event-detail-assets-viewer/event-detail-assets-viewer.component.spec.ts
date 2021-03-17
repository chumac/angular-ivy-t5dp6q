import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailAssetsViewerComponent } from './event-detail-assets-viewer.component';

describe('EventDetailAssetsViewerComponent', () => {
  let component: EventDetailAssetsViewerComponent;
  let fixture: ComponentFixture<EventDetailAssetsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailAssetsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailAssetsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
