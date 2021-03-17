import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplateDetailsViewerComponent } from './formTemplateDetails-viewer.component';

describe('FormTemplateDetailsViewerComponent', () => {
  let component: FormTemplateDetailsViewerComponent;
  let fixture: ComponentFixture<FormTemplateDetailsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplateDetailsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplateDetailsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
