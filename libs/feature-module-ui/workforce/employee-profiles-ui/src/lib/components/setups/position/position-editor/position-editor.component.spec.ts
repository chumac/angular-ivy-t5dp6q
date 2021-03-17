import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionEditorComponent } from './position-editor.component';

describe('PositionEditorComponent', () => {
  let component: PositionEditorComponent;
  let fixture: ComponentFixture<PositionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
