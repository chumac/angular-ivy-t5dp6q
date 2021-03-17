import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDependantsComponent } from './hr-dependants.component';

describe('HrDependantsComponent', () => {
  let component: HrDependantsComponent;
  let fixture: ComponentFixture<HrDependantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDependantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDependantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
