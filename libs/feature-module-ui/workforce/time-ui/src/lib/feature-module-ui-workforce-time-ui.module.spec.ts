import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiWorkforceTimeUiModule } from './feature-module-ui-workforce-time-ui.module';

describe('FeatureModuleUiWorkforceTimeUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiWorkforceTimeUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiWorkforceTimeUiModule).toBeDefined();
  });
});
