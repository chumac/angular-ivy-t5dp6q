import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseStructureNavigationComponent } from './enterprise-structure-navigation.component';

describe('EnterpriseStructureNavigationComponent', () => {
  let component: EnterpriseStructureNavigationComponent;
  let fixture: ComponentFixture<EnterpriseStructureNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseStructureNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseStructureNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
