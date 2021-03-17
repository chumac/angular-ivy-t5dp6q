import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingRowTemplateComponent } from './rating-row-template.component';

describe('RatingRowTemplateComponent', () => {
  let component: RatingRowTemplateComponent;
  let fixture: ComponentFixture<RatingRowTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingRowTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingRowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
