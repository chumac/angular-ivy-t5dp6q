import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrDataComponent } from './hr-data.component';

describe('HrDataComponent', () => {
  let component: HrDataComponent;
  let fixture: ComponentFixture<HrDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HrDataComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
