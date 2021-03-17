import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrContactComponent } from './hr-contact.component';

describe('HrContactComponent', () => {
  let component: HrContactComponent;
  let fixture: ComponentFixture<HrContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
