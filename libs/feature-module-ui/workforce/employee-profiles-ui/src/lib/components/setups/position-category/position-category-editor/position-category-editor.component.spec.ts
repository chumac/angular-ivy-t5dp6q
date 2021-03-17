import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCategoryEditorComponent } from './position-category-editor.component';

describe('PositionCategoryEditorComponent', () => {
  let component: PositionCategoryEditorComponent;
  let fixture: ComponentFixture<PositionCategoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionCategoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionCategoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
