import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansViewerComponent } from './plans-viewer.component';

describe('PlansViewerComponent', () => {
  let component: PlansViewerComponent;
  let fixture: ComponentFixture<PlansViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlansViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
