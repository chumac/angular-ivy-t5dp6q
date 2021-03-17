import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCurrencyEditorComponent } from './default-currency-editor.component';

describe('DefaultCurrencyEditorComponent', () => {
  let component: DefaultCurrencyEditorComponent;
  let fixture: ComponentFixture<DefaultCurrencyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultCurrencyEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultCurrencyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
