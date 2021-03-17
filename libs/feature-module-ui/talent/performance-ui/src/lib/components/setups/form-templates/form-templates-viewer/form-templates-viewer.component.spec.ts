import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTemplatesViewerComponent } from './formTemplates-viewer.component';

describe('FormTemplatesViewerComponent', () => {
  let component: FormTemplatesViewerComponent;
  let fixture: ComponentFixture<FormTemplatesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTemplatesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTemplatesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
