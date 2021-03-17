import { async, TestBed } from '@angular/core/testing';
import { ModelsWorkforceSubscriptionModule } from './models-workforce-subscription.module';

describe('ModelsWorkforceSubscriptionModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsWorkforceSubscriptionModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsWorkforceSubscriptionModule).toBeDefined();
  });
});
