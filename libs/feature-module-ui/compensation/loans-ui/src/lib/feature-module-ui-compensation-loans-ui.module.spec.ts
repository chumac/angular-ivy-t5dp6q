import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiCompensationLoansUiModule } from './feature-module-ui-compensation-loans-ui.module';

describe('FeatureModuleUiCompensationLoansUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiCompensationLoansUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiCompensationLoansUiModule).toBeDefined();
  });
});
