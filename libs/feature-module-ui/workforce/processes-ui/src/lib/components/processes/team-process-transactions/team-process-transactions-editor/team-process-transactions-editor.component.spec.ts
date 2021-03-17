import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamProcessTransactionsEditorComponent } from './teamProcessTransactions-editor.component';

describe('TeamProcessTransactionsEditorComponent', () => {
  let component: TeamProcessTransactionsEditorComponent;
  let fixture: ComponentFixture<TeamProcessTransactionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamProcessTransactionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamProcessTransactionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
