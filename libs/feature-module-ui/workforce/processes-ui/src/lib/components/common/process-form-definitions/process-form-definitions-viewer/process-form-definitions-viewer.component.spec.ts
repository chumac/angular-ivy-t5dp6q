import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessFormDefinitionsViewerComponent } from './processFormDefinitions-viewer.component';

describe('ProcessFormDefinitionsViewerComponent', () => {
  let component: ProcessFormDefinitionsViewerComponent;
  let fixture: ComponentFixture<ProcessFormDefinitionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessFormDefinitionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessFormDefinitionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
