import { async, TestBed } from '@angular/core/testing';
import { CompartsModule } from './comparts.module';

describe('CompartsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CompartsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CompartsModule).toBeDefined();
  });
});
