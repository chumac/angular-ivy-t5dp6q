import { async, TestBed } from '@angular/core/testing';
import { SharedAppGlobalModule } from './shared-app-global.module';

describe('SharedAppGlobalModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedAppGlobalModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedAppGlobalModule).toBeDefined();
  });
});
