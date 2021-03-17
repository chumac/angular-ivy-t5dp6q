import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisioningNavigationComponent } from './provisioning-navigation.component';

describe('ProvisioningNavigationComponent', () => {
  let component: ProvisioningNavigationComponent;
  let fixture: ComponentFixture<ProvisioningNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisioningNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisioningNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
