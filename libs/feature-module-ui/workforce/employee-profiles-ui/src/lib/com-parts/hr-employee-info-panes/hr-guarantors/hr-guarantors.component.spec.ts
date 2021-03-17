import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGuarantorsComponent } from './hr-guarantors.component';

describe('HrGuarantorsComponent', () => {
  let component: HrGuarantorsComponent;
  let fixture: ComponentFixture<HrGuarantorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrGuarantorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrGuarantorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
