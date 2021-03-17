import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiPlatformReportsUiModule } from './feature-module-ui-platform-reports-ui.module';

describe('FeatureModuleUiPlatformReportsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiPlatformReportsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiPlatformReportsUiModule).toBeDefined();
  });
});
