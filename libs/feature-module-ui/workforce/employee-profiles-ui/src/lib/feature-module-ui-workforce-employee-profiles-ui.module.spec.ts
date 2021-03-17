import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiWorkforceEmployeeProfilesUiModule } from './feature-module-ui-workforce-employee-profiles-ui.module';

describe('FeatureModuleUiWorkforceEmployeeProfilesUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiWorkforceEmployeeProfilesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiWorkforceEmployeeProfilesUiModule).toBeDefined();
  });
});
