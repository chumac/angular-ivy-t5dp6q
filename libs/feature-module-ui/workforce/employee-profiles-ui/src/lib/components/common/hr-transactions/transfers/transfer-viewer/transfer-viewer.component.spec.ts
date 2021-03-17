import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferViewerComponent } from './transfer-viewer.component';

describe('TransferViewerComponent', () => {
  let component: TransferViewerComponent;
  let fixture: ComponentFixture<TransferViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
