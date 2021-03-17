import { async, TestBed } from '@angular/core/testing';
import { StoreModulesWorkforceAbsenceModule } from './store-modules-workforce-absence.module';

describe('StoreModulesWorkforceAbsenceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModulesWorkforceAbsenceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreModulesWorkforceAbsenceModule).toBeDefined();
  });
});
