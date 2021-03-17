import { async, TestBed } from '@angular/core/testing';
import { ModelsPlatformDataUploadModule } from './models-platform-data-upload.module';

describe('ModelsPlatformDataUploadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModelsPlatformDataUploadModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModelsPlatformDataUploadModule).toBeDefined();
  });
});
