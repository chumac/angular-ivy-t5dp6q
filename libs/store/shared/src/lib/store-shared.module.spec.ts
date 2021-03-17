import { async, TestBed } from '@angular/core/testing';
import { StoreSharedModule } from './store-shared.module';

describe('StoreSharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreSharedModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreSharedModule).toBeDefined();
  });
});
