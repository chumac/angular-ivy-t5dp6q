import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDeductionsComponent } from './variable-deductions.component';

describe('VariableDeductionsComponent', () => {
  let component: VariableDeductionsComponent;
  let fixture: ComponentFixture<VariableDeductionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
