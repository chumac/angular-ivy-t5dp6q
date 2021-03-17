import { async, TestBed } from '@angular/core/testing';
import { ModelsCoreDataModule } from './models-core-data.module';

describe('ModelsCoreDataModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsCoreDataModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsCoreDataModule).toBeDefined();
  });
});
