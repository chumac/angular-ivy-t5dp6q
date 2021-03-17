import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveEditorComponent } from './remove-editor.component';

describe('RemoveEditorComponent', () => {
  let component: RemoveEditorComponent;
  let fixture: ComponentFixture<RemoveEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
