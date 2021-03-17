import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationViewerComponent } from './identification-viewer.component';

describe('IdentificationViewerComponent', () => {
  let component: IdentificationViewerComponent;
  let fixture: ComponentFixture<IdentificationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
