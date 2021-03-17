import { async, TestBed } from '@angular/core/testing';
import { ModelsWorkforceExitModule } from './models-workforce-exit.module';

describe('ModelsWorkforceExitModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsWorkforceExitModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsWorkforceExitModule).toBeDefined();
  });
});
