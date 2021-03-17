import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsViewerComponent } from './sections-viewer.component';

describe('SectionsViewerComponent', () => {
  let component: SectionsViewerComponent;
  let fixture: ComponentFixture<SectionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
