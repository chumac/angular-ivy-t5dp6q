import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryActionComponent } from './disciplinary-action.component';

describe('DisciplinaryActionComponent', () => {
  let component: DisciplinaryActionComponent;
  let fixture: ComponentFixture<DisciplinaryActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
