import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleWeightsViewerComponent } from './roleWeights-viewer.component';

describe('RoleWeightsViewerComponent', () => {
  let component: RoleWeightsViewerComponent;
  let fixture: ComponentFixture<RoleWeightsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleWeightsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleWeightsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
