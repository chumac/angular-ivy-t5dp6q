import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmiPanelComponent } from './omi-panel.component';

describe('OmiPanelComponent', () => {
  let component: OmiPanelComponent;
  let fixture: ComponentFixture<OmiPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OmiPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmiPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
