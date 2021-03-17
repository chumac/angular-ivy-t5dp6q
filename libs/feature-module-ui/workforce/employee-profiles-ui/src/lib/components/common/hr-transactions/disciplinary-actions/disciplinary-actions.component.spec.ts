import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryActionsComponent } from './disciplinary-actions.component';

describe('DisciplinaryActionsComponent', () => {
  let component: DisciplinaryActionsComponent;
  let fixture: ComponentFixture<DisciplinaryActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
