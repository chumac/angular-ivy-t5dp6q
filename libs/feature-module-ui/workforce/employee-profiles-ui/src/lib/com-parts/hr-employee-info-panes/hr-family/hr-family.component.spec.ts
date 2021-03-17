import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrFamilyComponent } from './hr-family.component';

describe('HrFamilyComponent', () => {
  let component: HrFamilyComponent;
  let fixture: ComponentFixture<HrFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
