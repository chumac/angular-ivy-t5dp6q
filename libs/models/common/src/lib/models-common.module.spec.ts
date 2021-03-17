import { async, TestBed } from '@angular/core/testing';
import { ModelsCommonModule } from './models-common.module';

describe('ModelsCommonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsCommonModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsCommonModule).toBeDefined();
  });
});
