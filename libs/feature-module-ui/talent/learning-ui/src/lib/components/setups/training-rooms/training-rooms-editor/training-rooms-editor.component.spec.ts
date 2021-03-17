import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRoomsEditorComponent } from './training-rooms-editor.component';

describe('TrainingRoomsEditorComponent', () => {
  let component: TrainingRoomsEditorComponent;
  let fixture: ComponentFixture<TrainingRoomsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRoomsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRoomsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
