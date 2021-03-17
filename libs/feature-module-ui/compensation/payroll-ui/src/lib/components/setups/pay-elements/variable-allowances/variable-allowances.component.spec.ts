import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableAllowancesComponent } from './variable-allowances.component';

describe('VariableAllowancesComponent', () => {
  let component: VariableAllowancesComponent;
  let fixture: ComponentFixture<VariableAllowancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableAllowancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
