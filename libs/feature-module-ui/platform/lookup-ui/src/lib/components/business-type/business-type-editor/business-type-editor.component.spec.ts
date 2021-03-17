import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTypeEditorComponent } from './business-type-editor.component';

describe('BusinessTypeEditorComponent', () => {
  let component: BusinessTypeEditorComponent;
  let fixture: ComponentFixture<BusinessTypeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessTypeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessTypeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
