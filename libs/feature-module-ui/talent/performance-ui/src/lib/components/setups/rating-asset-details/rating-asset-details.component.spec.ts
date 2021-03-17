import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAssetDetailsComponent } from './ratingAssetDetails.component';

describe('RatingAssetDetailsComponent', () => {
  let component: RatingAssetDetailsComponent;
  let fixture: ComponentFixture<RatingAssetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAssetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
