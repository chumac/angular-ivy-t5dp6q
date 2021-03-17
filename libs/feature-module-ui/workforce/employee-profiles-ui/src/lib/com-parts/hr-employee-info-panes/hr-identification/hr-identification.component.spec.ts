import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrIdentificationComponent } from './hr-identification.component';

describe('HrIdentificationComponent', () => {
  let component: HrIdentificationComponent;
  let fixture: ComponentFixture<HrIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
