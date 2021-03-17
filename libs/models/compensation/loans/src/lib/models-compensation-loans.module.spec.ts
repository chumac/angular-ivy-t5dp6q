import { async, TestBed } from '@angular/core/testing';
import { ModelsCompensationLoansModule } from './models-compensation-loans.module';

describe('ModelsCompensationLoansModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsCompensationLoansModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsCompensationLoansModule).toBeDefined();
  });
});
