import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiWorkforceAbsenceUiModule } from './feature-module-ui-workforce-absence-ui.module';

describe('FeatureModuleUiWorkforceAbsenceUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiWorkforceAbsenceUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiWorkforceAbsenceUiModule).toBeDefined();
  });
});
