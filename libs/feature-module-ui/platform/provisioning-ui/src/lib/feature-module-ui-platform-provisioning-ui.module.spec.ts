import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiPlatformProvisioningUiModule } from './feature-module-ui-platform-provisioning-ui.module';

describe('FeatureModuleUiPlatformProvisioningUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiPlatformProvisioningUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiPlatformProvisioningUiModule).toBeDefined();
  });
});
