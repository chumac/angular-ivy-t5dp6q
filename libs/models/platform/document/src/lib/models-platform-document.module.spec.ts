import { async, TestBed } from '@angular/core/testing';
import { ModelsPlatformDocumentModule } from './models-platform-document.module';

describe('ModelsPlatformDocumentModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsPlatformDocumentModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsPlatformDocumentModule).toBeDefined();
  });
});
