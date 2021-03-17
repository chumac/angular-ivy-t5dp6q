import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAssetDefinitionsEditorComponent } from './ratingAssetDefinitions-editor.component';

describe('RatingAssetDefinitionsEditorComponent', () => {
  let component: RatingAssetDefinitionsEditorComponent;
  let fixture: ComponentFixture<RatingAssetDefinitionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAssetDefinitionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAssetDefinitionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
