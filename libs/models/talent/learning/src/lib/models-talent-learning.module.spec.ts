
  import { async, TestBed } from '@angular/core/testing';
  import { ModelsTalentLearningModule } from './models-talent-learning.module';
  
  describe('ModelsTalentLearningModule', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ ModelsTalentLearningModule ]
      })
      .compileComponents();
    }));
  
    it('should create', () => {
      expect(ModelsTalentLearningModule).toBeDefined();
    });
  });
        