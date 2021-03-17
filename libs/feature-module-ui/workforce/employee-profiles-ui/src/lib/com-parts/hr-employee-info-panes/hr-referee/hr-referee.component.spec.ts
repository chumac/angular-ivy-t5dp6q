import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrRefereeComponent } from './hr-referee.component';

describe('HrRefereeComponent', () => {
  let component: HrRefereeComponent;
  let fixture: ComponentFixture<HrRefereeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrRefereeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
