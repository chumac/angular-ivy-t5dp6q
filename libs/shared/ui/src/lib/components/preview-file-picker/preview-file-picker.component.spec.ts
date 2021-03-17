import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFilePickerComponent } from './preview-file-picker.component';

describe('PreviewFilePickerComponent', () => {
  let component: PreviewFilePickerComponent;
  let fixture: ComponentFixture<PreviewFilePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFilePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFilePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
