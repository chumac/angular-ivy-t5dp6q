import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRefereesComponent } from './personal-referees.component';

describe('PersonalRefereesComponent', () => {
  let component: PersonalRefereesComponent;
  let fixture: ComponentFixture<PersonalRefereesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalRefereesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalRefereesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
