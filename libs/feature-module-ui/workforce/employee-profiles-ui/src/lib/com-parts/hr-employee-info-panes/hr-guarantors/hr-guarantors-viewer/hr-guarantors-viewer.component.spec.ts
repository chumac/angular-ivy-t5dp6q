import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrGuarantorsViewerComponent } from './hr-guarantors-viewer.component';

describe('HrGuarantorsViewerComponent', () => {
  let component: HrGuarantorsViewerComponent;
  let fixture: ComponentFixture<HrGuarantorsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrGuarantorsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrGuarantorsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
