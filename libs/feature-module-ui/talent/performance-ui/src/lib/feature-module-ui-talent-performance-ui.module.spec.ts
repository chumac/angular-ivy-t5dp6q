import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiTalentPerformanceUiModule } from './feature-module-ui-talent-performance-ui.module';

describe('FeatureModuleUiTalentPerformanceUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiTalentPerformanceUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiTalentPerformanceUiModule).toBeDefined();
  });
});
