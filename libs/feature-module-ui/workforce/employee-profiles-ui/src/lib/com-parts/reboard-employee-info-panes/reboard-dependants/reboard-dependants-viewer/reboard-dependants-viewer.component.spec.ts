import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependantsViewerComponent } from './dependants-viewer.component';

describe('DependantsViewerComponent', () => {
  let component: DependantsViewerComponent;
  let fixture: ComponentFixture<DependantsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependantsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependantsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
