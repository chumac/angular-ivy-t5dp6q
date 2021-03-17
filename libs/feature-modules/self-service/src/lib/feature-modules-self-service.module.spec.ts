import { async, TestBed } from '@angular/core/testing';
import { FeatureModulesSelfServiceModule } from './feature-modules-self-service.module';

describe('FeatureModulesSelfServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureModulesSelfServiceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureModulesSelfServiceModule).toBeDefined();
  });
});
