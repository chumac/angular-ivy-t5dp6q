import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiPlatformHrFoundationsUiModule } from './feature-module-ui-platform-hr-foundations-ui.module';

describe('FeatureModuleUiPlatformHrFoundationsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiPlatformHrFoundationsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiPlatformHrFoundationsUiModule).toBeDefined();
  });
});
