import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesViewerComponent } from './beneficiaries-viewer.component';

describe('BeneficiariesViewerComponent', () => {
  let component: BeneficiariesViewerComponent;
  let fixture: ComponentFixture<BeneficiariesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiariesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
