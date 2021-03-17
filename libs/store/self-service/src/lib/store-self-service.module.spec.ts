import { async, TestBed } from '@angular/core/testing';
import { StoreSelfServiceModule } from './store-self-service.module';

describe('StoreSelfServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreSelfServiceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StoreSelfServiceModule).toBeDefined();
  });
});
