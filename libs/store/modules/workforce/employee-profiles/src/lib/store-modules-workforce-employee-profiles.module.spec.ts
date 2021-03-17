import { async, TestBed } from '@angular/core/testing';
import { StoreModulesWorkforceEmployeeProfilesModule } from './store-modules-workforce-employee-profiles.module';

describe('StoreModulesWorkforceEmployeeProfilesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModulesWorkforceEmployeeProfilesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreModulesWorkforceEmployeeProfilesModule).toBeDefined();
  });
});
