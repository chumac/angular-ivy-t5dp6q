import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMasterPageComponent } from './adm-master-page.component';

describe('AdmMasterPageComponent', () => {
  let component: AdmMasterPageComponent;
  let fixture: ComponentFixture<AdmMasterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdmMasterPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
