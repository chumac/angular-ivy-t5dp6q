import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsvMasterPageComponent } from './ssv-master-page.component';

describe('SsMasterPageComponent', () => {
  let component: SsvMasterPageComponent;
  let fixture: ComponentFixture<SsvMasterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SsvMasterPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsvMasterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
