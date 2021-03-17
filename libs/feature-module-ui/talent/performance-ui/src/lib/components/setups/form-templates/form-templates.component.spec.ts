import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplatesComponent } from './formTemplates.component';

describe('FormTemplatesComponent', () => {
  let component: FormTemplatesComponent;
  let fixture: ComponentFixture<FormTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
