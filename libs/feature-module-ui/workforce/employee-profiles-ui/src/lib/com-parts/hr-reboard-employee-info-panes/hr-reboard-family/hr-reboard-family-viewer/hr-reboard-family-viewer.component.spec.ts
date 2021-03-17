import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyViewerComponent } from './family-viewer.component';

describe('FamilyViewerComponent', () => {
  let component: FamilyViewerComponent;
  let fixture: ComponentFixture<FamilyViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
