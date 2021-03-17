import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiTalentLearningUiModule } from './feature-module-ui-talent-learning-ui.module';

describe('FeatureModuleUiTalentLearningUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiTalentLearningUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiTalentLearningUiModule).toBeDefined();
  });
});
