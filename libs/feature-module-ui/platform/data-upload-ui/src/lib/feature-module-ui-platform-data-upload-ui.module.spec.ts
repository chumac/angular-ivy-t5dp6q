import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiPlatformDataUploadUiModule } from './feature-module-ui-platform-data-upload-ui.module';

describe('FeatureModuleUiPlatformDataUploadUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiPlatformDataUploadUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiPlatformDataUploadUiModule).toBeDefined();
  });
});
