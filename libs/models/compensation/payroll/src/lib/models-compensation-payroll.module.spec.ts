import { async, TestBed } from '@angular/core/testing';
import { ModelsCompensationPayrollModule } from './models-compensation-payroll.module';

describe('ModelsCompensationPayrollModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsCompensationPayrollModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsCompensationPayrollModule).toBeDefined();
  });
});
