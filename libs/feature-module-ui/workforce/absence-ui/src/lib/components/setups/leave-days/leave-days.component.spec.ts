import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDaysComponent } from './leave-days.component';

describe('LeaveDaysComponent', () => {
  let component: LeaveDaysComponent;
  let fixture: ComponentFixture<LeaveDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
