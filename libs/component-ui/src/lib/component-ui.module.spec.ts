import { async, TestBed } from '@angular/core/testing';
import { ComponentUiModule } from './component-ui.module';

describe('ComponentUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ComponentUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ComponentUiModule).toBeDefined();
  });
});
