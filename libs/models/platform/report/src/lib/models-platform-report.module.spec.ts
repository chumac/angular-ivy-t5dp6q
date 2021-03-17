import { async, TestBed } from '@angular/core/testing';
import { ModelsPlatformReportModule } from './models-platform-report.module';

describe('ModelsPlatformReportModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsPlatformReportModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsPlatformReportModule).toBeDefined();
  });
});
