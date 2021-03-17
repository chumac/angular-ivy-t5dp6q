import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiCompensationPaymentUiModule } from './feature-module-ui-compensation-payment-ui.module';

describe('FeatureModuleUiCompensationPaymentUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiCompensationPaymentUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiCompensationPaymentUiModule).toBeDefined();
  });
});
