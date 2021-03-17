import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorsEditorComponent } from './guarantors-editor.component';

describe('GuarantorsEditorComponent', () => {
  let component: GuarantorsEditorComponent;
  let fixture: ComponentFixture<GuarantorsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
