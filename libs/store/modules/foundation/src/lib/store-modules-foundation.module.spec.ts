import { async, TestBed } from '@angular/core/testing';
import { StoreModulesFoundationModule } from './store-modules-foundation.module';

describe('StoreModulesFoundationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModulesFoundationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreModulesFoundationModule).toBeDefined();
  });
});
