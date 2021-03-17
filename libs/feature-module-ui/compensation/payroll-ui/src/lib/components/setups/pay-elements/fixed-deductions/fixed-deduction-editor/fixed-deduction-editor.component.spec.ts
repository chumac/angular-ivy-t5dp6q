import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedDeductionEditorComponent } from './fixed-deduction-editor.component';

describe('FixedDeductionEditorComponent', () => {
  let component: FixedDeductionEditorComponent;
  let fixture: ComponentFixture<FixedDeductionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedDeductionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedDeductionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
