import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrBeneficiariesViewerComponent } from './hr-beneficiaries-viewer.component';

describe('HrBeneficiariesViewerComponent', () => {
  let component: HrBeneficiariesViewerComponent;
  let fixture: ComponentFixture<HrBeneficiariesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrBeneficiariesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrBeneficiariesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
