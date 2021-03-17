import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaryRoleComponent } from './disciplinary-role.component';

describe('DisciplinaryRoleComponent', () => {
  let component: DisciplinaryRoleComponent;
  let fixture: ComponentFixture<DisciplinaryRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinaryRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplinaryRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
