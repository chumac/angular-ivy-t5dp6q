import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrTrainingHistoryComponent } from './hr-training-history.component';

describe('HrTrainingHistoryComponent', () => {
  let component: HrTrainingHistoryComponent;
  let fixture: ComponentFixture<HrTrainingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTrainingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTrainingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
