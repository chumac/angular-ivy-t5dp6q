import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrEducationalHistoryComponent } from './hr-educational-history.component';

describe('HrEducationalHistoryComponent', () => {
  let component: HrEducationalHistoryComponent;
  let fixture: ComponentFixture<HrEducationalHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrEducationalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrEducationalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
