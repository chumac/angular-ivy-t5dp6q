import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityViewerComponent } from './security-viewer.component';

describe('SecurityViewerComponent', () => {
  let component: SecurityViewerComponent;
  let fixture: ComponentFixture<SecurityViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
