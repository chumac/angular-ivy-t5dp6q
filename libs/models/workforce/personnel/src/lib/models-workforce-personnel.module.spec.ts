import { async, TestBed } from '@angular/core/testing';
import { ModelsWorkforcePersonnelModule } from './models-workforce-personnel.module';

describe('ModelsWorkforcePersonnelModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsWorkforcePersonnelModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsWorkforcePersonnelModule).toBeDefined();
  });
});
