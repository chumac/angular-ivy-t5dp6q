import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDataFormsComponent } from './customDataForms.component';

describe('CustomDataFormsComponent', () => {
  let component: CustomDataFormsComponent;
  let fixture: ComponentFixture<CustomDataFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDataFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDataFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
