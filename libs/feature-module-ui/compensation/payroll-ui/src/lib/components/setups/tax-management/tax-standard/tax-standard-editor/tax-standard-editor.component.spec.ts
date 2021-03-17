import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxStandardEditorComponent } from './tax-standard-editor.component';

describe('TaxStandardEditorComponent', () => {
  let component: TaxStandardEditorComponent;
  let fixture: ComponentFixture<TaxStandardEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxStandardEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxStandardEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
