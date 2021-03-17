import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuarantorsViewerComponent } from './guarantors-viewer.component';

describe('GuarantorsViewerComponent', () => {
  let component: GuarantorsViewerComponent;
  let fixture: ComponentFixture<GuarantorsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuarantorsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuarantorsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
