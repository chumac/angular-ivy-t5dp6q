import { async, TestBed } from '@angular/core/testing';
import { SharedNavigationModule } from './shared-navigation.module';

describe('SharedNavigationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedNavigationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedNavigationModule).toBeDefined();
  });
});
