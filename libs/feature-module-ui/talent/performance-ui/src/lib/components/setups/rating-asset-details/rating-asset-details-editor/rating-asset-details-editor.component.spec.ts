import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAssetDetailsEditorComponent } from './ratingAssetDetails-editor.component';

describe('RatingAssetDetailsEditorComponent', () => {
  let component: RatingAssetDetailsEditorComponent;
  let fixture: ComponentFixture<RatingAssetDetailsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAssetDetailsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAssetDetailsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
