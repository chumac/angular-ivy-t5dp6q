import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleWeightsComponent } from './roleWeights.component';

describe('RoleWeightsComponent', () => {
  let component: RoleWeightsComponent;
  let fixture: ComponentFixture<RoleWeightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleWeightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleWeightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
