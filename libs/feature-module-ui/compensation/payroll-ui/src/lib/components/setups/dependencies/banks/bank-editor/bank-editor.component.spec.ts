import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankEditorComponent } from './bank-editor.component';

describe('BankEditorComponent', () => {
  let component: BankEditorComponent;
  let fixture: ComponentFixture<BankEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
