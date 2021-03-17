import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiPlatformAnalyticsUiModule } from './feature-module-ui-platform-analytics-ui.module';

describe('FeatureModuleUiPlatformAnalyticsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiPlatformAnalyticsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiPlatformAnalyticsUiModule).toBeDefined();
  });
});
