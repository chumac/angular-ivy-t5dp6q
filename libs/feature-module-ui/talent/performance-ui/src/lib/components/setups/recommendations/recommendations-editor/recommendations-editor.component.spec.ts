import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsEditorComponent } from './recommendations-editor.component';

describe('RecommendationsEditorComponent', () => {
  let component: RecommendationsEditorComponent;
  let fixture: ComponentFixture<RecommendationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
