import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailAssetsEditorComponent } from './event-detail-assets-editor.component';

describe('EventDetailAssetsEditorComponent', () => {
  let component: EventDetailAssetsEditorComponent;
  let fixture: ComponentFixture<EventDetailAssetsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailAssetsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailAssetsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
