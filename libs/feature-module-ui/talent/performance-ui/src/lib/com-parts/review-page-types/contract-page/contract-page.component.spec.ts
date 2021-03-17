import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPageComponent } from './contract-page.component';

describe('ContractPageComponent', () => {
  let component: ContractPageComponent;
  let fixture: ComponentFixture<ContractPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
