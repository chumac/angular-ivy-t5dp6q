import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseStructureDetailConnectorComponent } from './enterprise-structure-detail-connector.component';

describe('EnterpriseStructureDetailPromoterComponent', () => {
  let component: EnterpriseStructureDetailConnectorComponent;
  let fixture: ComponentFixture<EnterpriseStructureDetailConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseStructureDetailConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseStructureDetailConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
