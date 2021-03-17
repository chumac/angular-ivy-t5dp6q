import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxQinfoComponent } from './dialog-box-qinfo.component';

describe('DialogBoxQinfoComponent', () => {
  let component: DialogBoxQinfoComponent;
  let fixture: ComponentFixture<DialogBoxQinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBoxQinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxQinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
