import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferImportsComponent } from './transfer-imports.component';

describe('TransferImportsComponent', () => {
  let component: TransferImportsComponent;
  let fixture: ComponentFixture<TransferImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferImportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
