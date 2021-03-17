import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiPlatformLookupUiModule } from './feature-module-ui-platform-lookup-ui.module';

describe('FeatureModuleUiPlatformLookupUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiPlatformLookupUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiPlatformLookupUiModule).toBeDefined();
  });
});
