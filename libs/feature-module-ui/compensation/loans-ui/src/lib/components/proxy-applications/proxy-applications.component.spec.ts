import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyApplicationsComponent } from './proxy-applications.component';

describe('ProxyApplicationsComponent', () => {
  let component: ProxyApplicationsComponent;
  let fixture: ComponentFixture<ProxyApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
