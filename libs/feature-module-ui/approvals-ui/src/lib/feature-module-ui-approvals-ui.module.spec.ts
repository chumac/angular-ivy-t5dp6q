import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiApprovalsUiModule } from './feature-module-ui-approvals-ui.module';

describe('FeatureModuleUiApprovalsUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiApprovalsUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiApprovalsUiModule).toBeDefined();
  });
});
