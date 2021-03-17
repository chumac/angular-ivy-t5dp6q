import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationsViewerComponent } from './confirmations-viewer.component';

describe('ConfirmationsViewerComponent', () => {
  let component: ConfirmationsViewerComponent;
  let fixture: ComponentFixture<ConfirmationsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
