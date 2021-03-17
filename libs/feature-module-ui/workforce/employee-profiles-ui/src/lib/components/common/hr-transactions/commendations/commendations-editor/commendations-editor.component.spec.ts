import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommendationsEditorComponent } from './commendations-editor.component';

describe('CommendationsEditorComponent', () => {
  let component: CommendationsEditorComponent;
  let fixture: ComponentFixture<CommendationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommendationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommendationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
