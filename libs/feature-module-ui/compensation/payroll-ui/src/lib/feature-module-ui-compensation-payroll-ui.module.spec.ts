import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiCompensationPayrollUiModule } from './feature-module-ui-compensation-payroll-ui.module';

describe('FeatureModuleUiCompensationPayrollUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiCompensationPayrollUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiCompensationPayrollUiModule).toBeDefined();
  });
});
