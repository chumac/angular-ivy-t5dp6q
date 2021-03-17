import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalNavigationComponent } from './medical-navigation.component';

describe('MedicalNavigationComponent', () => {
  let component: MedicalNavigationComponent;
  let fixture: ComponentFixture<MedicalNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
