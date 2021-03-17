import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayGroupEditorComponent } from './pay-group-editor.component';

describe('PayGroupEditorComponent', () => {
  let component: PayGroupEditorComponent;
  let fixture: ComponentFixture<PayGroupEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayGroupEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
