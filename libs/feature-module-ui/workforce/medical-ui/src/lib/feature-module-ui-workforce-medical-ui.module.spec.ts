import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiWorkforceMedicalUiModule } from './feature-module-ui-workforce-medical-ui.module';

describe('FeatureModuleUiWorkforceMedicalUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiWorkforceMedicalUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiWorkforceMedicalUiModule).toBeDefined();
  });
});
