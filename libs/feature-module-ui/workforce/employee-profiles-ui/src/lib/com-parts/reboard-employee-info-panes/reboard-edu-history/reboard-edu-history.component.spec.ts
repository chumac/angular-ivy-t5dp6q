import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalHistoryComponent } from './educational-history.component';

describe('EducationalHistoryComponent', () => {
  let component: EducationalHistoryComponent;
  let fixture: ComponentFixture<EducationalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EducationalHistoryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
