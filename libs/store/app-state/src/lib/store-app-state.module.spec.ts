import { async, TestBed } from '@angular/core/testing';
import { StoreAppStateModule } from './store-app-state.module';

describe('StoreAppStateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreAppStateModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreAppStateModule).toBeDefined();
  });
});
