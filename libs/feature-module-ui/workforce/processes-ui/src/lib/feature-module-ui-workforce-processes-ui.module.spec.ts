import { async, TestBed } from '@angular/core/testing';
import { FeatureModuleUiWorkforceProcessesUiModule } from './feature-module-ui-workforce-processes-ui.module';

describe('FeatureModuleUiWorkforceProcessesUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModuleUiWorkforceProcessesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModuleUiWorkforceProcessesUiModule).toBeDefined();
  });
});
