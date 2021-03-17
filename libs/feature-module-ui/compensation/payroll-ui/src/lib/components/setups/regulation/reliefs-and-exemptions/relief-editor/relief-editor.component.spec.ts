import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReliefEditorComponent } from './relief-editor.component';

describe('ReliefEditorComponent', () => {
  let component: ReliefEditorComponent;
  let fixture: ComponentFixture<ReliefEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReliefEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReliefEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
