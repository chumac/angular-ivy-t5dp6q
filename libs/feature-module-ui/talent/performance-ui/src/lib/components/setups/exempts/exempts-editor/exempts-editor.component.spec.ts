import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptsEditorComponent } from './exempts-editor.component';

describe('ExemptsEditorComponent', () => {
  let component: ExemptsEditorComponent;
  let fixture: ComponentFixture<ExemptsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExemptsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
