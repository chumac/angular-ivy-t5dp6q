import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDisciplinaryActionsComponent } from './hr-disciplinary-actions.component';

describe('HrDisciplinaryActionsComponent', () => {
  let component: HrDisciplinaryActionsComponent;
  let fixture: ComponentFixture<HrDisciplinaryActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDisciplinaryActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDisciplinaryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
