import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTreeComponent } from './transfer-tree.component';

describe('TransferTreeComponent', () => {
  let component: TransferTreeComponent;
  let fixture: ComponentFixture<TransferTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
