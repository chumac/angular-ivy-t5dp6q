import { async, TestBed } from '@angular/core/testing';
import { ModelsTalentPerformanceModule } from './models-talent-performance.module';

describe('ModelsTalentPerformanceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsTalentPerformanceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsTalentPerformanceModule).toBeDefined();
  });
});
