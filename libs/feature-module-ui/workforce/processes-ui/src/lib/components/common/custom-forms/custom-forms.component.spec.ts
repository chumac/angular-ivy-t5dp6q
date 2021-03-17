import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormsComponent } from './customForms.component';

describe('CustomFormsComponent', () => {
  let component: CustomFormsComponent;
  let fixture: ComponentFixture<CustomFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
