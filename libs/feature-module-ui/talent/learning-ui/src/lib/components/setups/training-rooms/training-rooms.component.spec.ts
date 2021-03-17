import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRoomsComponent } from './training-rooms.component';

describe('TrainingRoomsComponent', () => {
  let component: TrainingRoomsComponent;
  let fixture: ComponentFixture<TrainingRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
