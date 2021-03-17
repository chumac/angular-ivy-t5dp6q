import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAssetDefinitionsComponent } from './ratingAssetDefinitions.component';

describe('RatingAssetDefinitionsComponent', () => {
  let component: RatingAssetDefinitionsComponent;
  let fixture: ComponentFixture<RatingAssetDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingAssetDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingAssetDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
