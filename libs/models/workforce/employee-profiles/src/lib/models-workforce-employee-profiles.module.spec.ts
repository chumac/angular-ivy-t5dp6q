import { async, TestBed } from '@angular/core/testing';
import { ModelsWorkforceEmployeeProfilesModule } from './models-workforce-employee-profiles.module';

describe('ModelsWorkforceEmployeeProfilesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsWorkforceEmployeeProfilesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsWorkforceEmployeeProfilesModule).toBeDefined();
  });
});
