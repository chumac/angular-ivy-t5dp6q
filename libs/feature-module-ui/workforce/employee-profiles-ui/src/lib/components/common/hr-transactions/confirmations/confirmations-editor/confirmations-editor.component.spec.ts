import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationsEditorComponent } from './confirmations-editor.component';

describe('ConfirmationsEditorComponent', () => {
  let component: ConfirmationsEditorComponent;
  let fixture: ComponentFixture<ConfirmationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
