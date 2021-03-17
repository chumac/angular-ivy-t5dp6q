import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRoomsViewerComponent } from './training-rooms-viewer.component';

describe('TrainingRoomsViewerComponent', () => {
  let component: TrainingRoomsViewerComponent;
  let fixture: ComponentFixture<TrainingRoomsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRoomsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRoomsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
