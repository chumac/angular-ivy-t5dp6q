import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAssetDetailsViewerComponent } from './ratingAssetDetails-viewer.component';

describe('RatingAssetDetailsViewerComponent', () => {
  let component: RatingAssetDetailsViewerComponent;
  let fixture: ComponentFixture<RatingAssetDetailsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAssetDetailsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAssetDetailsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
