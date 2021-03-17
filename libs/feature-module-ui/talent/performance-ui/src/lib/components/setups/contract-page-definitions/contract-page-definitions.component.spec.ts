import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPageDefinitionsComponent } from './contractPageDefinitions.component';

describe('ContractPageDefinitionsComponent', () => {
  let component: ContractPageDefinitionsComponent;
  let fixture: ComponentFixture<ContractPageDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPageDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPageDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
