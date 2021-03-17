import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateDetailsComponent } from './formTemplateDetails.component';

describe('FormTemplateDetailsComponent', () => {
  let component: FormTemplateDetailsComponent;
  let fixture: ComponentFixture<FormTemplateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
