import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrCustomDataFormsComponent } from './hrCustomDataForms.component';

describe('HrCustomDataFormsComponent', () => {
  let component: HrCustomDataFormsComponent;
  let fixture: ComponentFixture<HrCustomDataFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrCustomDataFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrCustomDataFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
