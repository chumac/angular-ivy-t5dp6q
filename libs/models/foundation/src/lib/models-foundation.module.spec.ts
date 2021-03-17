import { async, TestBed } from '@angular/core/testing';
import { ModelsFoundationModule } from './models-foundation.module';

describe('ModelsFoundationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsFoundationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsFoundationModule).toBeDefined();
  });
});
