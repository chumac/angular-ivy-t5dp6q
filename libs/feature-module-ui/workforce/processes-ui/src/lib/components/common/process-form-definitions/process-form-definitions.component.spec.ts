import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFormDefinitionsComponent } from './processFormDefinitions.component';

describe('ProcessFormDefinitionsComponent', () => {
  let component: ProcessFormDefinitionsComponent;
  let fixture: ComponentFixture<ProcessFormDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessFormDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessFormDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
