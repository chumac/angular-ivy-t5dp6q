import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxMdlsComponent } from './dialog-box-mdls.component';

describe('DialogBoxMdlsComponent', () => {
  let component: DialogBoxMdlsComponent;
  let fixture: ComponentFixture<DialogBoxMdlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxMdlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxMdlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
