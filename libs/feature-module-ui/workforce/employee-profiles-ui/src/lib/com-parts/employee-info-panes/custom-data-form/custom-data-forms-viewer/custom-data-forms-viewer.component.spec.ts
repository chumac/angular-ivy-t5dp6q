import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDataFormsViewerComponent } from './customDataForms-viewer.component';

describe('CustomDataFormsViewerComponent', () => {
  let component: CustomDataFormsViewerComponent;
  let fixture: ComponentFixture<CustomDataFormsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDataFormsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDataFormsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
