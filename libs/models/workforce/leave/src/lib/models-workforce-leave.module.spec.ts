import { async, TestBed } from '@angular/core/testing';
import { ModelsWorkforceLeaveModule } from './models-workforce-leave.module';

describe('ModelsWorkforceLeaveModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsWorkforceLeaveModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsWorkforceLeaveModule).toBeDefined();
  });
});
