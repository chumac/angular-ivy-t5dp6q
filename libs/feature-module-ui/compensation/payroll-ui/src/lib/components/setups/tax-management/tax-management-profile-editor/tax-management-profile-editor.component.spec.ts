import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxManagementProfileEditorComponent } from './tax-management-profile-editor.component';

describe('TaxManagementProfileEditorComponent', () => {
  let component: TaxManagementProfileEditorComponent;
  let fixture: ComponentFixture<TaxManagementProfileEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxManagementProfileEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxManagementProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
