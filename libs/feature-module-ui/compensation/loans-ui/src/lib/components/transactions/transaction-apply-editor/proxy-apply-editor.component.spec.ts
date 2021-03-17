import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyApplyEditorComponent } from './proxy-apply-editor.component';

describe('ProxyApplyEditorComponent', () => {
  let component: ProxyApplyEditorComponent;
  let fixture: ComponentFixture<ProxyApplyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyApplyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyApplyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
