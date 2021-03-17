import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningLibraryComponent } from './learning-library.component';

describe('LearningLibraryComponent', () => {
  let component: LearningLibraryComponent;
  let fixture: ComponentFixture<LearningLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
