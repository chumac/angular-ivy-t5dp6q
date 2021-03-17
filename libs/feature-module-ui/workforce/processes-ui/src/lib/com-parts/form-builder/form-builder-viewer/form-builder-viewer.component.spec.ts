import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderViewerComponent } from './form-builder-viewer.component';

describe('FormBuilderViewerComponent', () => {
  let component: FormBuilderViewerComponent;
  let fixture: ComponentFixture<FormBuilderViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBuilderViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
