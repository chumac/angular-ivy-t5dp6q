import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiPlatformDocumentsUiModule } from './feature-module-ui-platform-documents-ui.module';

describe('FeatureModuleUiPlatformDocumentsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiPlatformDocumentsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiPlatformDocumentsUiModule).toBeDefined();
  });
});
