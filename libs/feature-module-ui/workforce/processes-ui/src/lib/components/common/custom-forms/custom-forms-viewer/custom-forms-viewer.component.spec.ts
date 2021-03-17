import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormsViewerComponent } from './customForms-viewer.component';

describe('CustomFormsViewerComponent', () => {
  let component: CustomFormsViewerComponent;
  let fixture: ComponentFixture<CustomFormsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
