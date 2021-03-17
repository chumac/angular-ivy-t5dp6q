
  import { async, TestBed } from '@angular/core/testing';
  import { ModelsPlatformLookupModule } from './models-platform-lookup.module';
  
  describe('ModelsPlatformLookupModule', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ ModelsPlatformLookupModule ]
      })
      .compileComponents();
    }));
  
    it('should create', () => {
      expect(ModelsPlatformLookupModule).toBeDefined();
    });
  });
        