import { async, TestBed } from '@angular/core/testing';
import { ModelsWorkforceTimeSheetModule } from './models-workforce-time-sheet.module';

describe('ModelsWorkforceTimeSheetModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsWorkforceTimeSheetModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsWorkforceTimeSheetModule).toBeDefined();
  });
});
