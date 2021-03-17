import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayEditorComponent } from './pay-editor.component';

describe('PayEditorComponent', () => {
  let component: PayEditorComponent;
  let fixture: ComponentFixture<PayEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
