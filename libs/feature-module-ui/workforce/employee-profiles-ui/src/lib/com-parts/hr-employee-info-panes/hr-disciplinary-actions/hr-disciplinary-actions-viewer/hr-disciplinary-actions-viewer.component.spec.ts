import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDisciplinaryActionsViewerComponent } from './hr-disciplinary-actions-viewer.component';

describe('HrDisciplinaryActionsViewerComponent', () => {
  let component: HrDisciplinaryActionsViewerComponent;
  let fixture: ComponentFixture<HrDisciplinaryActionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDisciplinaryActionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDisciplinaryActionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
