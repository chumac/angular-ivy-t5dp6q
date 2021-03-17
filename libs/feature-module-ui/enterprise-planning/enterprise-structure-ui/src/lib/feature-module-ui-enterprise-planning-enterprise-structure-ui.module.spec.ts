import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiEnterprisePlanningEnterpriseStructureUiModule } from './feature-module-ui-enterprise-planning-enterprise-structure-ui.module';

describe('FeatureModuleUiEnterprisePlanningEnterpriseStructureUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiEnterprisePlanningEnterpriseStructureUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(
      FeatureModuleUiEnterprisePlanningEnterpriseStructureUiModule
    ).toBeDefined();
  });
});
