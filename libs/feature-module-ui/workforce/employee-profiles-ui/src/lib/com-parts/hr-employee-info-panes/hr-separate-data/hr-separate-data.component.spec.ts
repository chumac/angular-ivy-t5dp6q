import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSeparateDataComponent } from './hr-separate-data.component';

describe('HrSeparateDataComponent', () => {
  let component: HrSeparateDataComponent;
  let fixture: ComponentFixture<HrSeparateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSeparateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSeparateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
