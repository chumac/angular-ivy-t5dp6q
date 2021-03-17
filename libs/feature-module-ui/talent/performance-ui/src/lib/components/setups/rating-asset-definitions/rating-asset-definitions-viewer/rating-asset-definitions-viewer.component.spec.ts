import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAssetDefinitionsViewerComponent } from './ratingAssetDefinitions-viewer.component';

describe('RatingAssetDefinitionsViewerComponent', () => {
  let component: RatingAssetDefinitionsViewerComponent;
  let fixture: ComponentFixture<RatingAssetDefinitionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAssetDefinitionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAssetDefinitionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
