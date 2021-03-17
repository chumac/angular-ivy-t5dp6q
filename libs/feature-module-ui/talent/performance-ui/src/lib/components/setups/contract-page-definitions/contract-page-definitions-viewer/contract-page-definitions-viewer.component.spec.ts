import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPageDefinitionsViewerComponent } from './contractPageDefinitions-viewer.component';

describe('ContractPageDefinitionsViewerComponent', () => {
  let component: ContractPageDefinitionsViewerComponent;
  let fixture: ComponentFixture<ContractPageDefinitionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPageDefinitionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPageDefinitionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
