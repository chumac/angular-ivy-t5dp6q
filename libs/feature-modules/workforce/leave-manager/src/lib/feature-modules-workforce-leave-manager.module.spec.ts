import { async, TestBed } from '@angular/core/testing';
import { FeatureModulesWorkforceLeaveManagerModule } from './feature-modules-workforce-leave-manager.module';

describe('FeatureModulesWorkforceLeaveManagerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModulesWorkforceLeaveManagerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModulesWorkforceLeaveManagerModule).toBeDefined();
  });
});
