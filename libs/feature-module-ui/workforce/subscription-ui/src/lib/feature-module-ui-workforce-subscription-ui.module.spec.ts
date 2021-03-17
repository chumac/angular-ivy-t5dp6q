import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiWorkforceSubscriptionUiModule } from './feature-module-ui-workforce-subscription-ui.module';

describe('FeatureModuleUiWorkforceSubscriptionUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiWorkforceSubscriptionUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiWorkforceSubscriptionUiModule).toBeDefined();
  });
});
