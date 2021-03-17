import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferEditorComponent } from './transfer-editor.component';

describe('TransferEditorComponent', () => {
  let component: TransferEditorComponent;
  let fixture: ComponentFixture<TransferEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
