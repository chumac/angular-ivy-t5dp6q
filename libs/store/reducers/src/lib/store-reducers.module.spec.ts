import { async, TestBed } from '@angular/core/testing';
import { StoreReducersModule } from './store-reducers.module';

describe('StoreReducersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreReducersModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreReducersModule).toBeDefined();
  });
});
