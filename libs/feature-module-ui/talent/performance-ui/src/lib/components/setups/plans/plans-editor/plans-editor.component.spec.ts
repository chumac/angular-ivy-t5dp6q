import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansEditorComponent } from './plans-editor.component';

describe('PlansEditorComponent', () => {
  let component: PlansEditorComponent;
  let fixture: ComponentFixture<PlansEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
