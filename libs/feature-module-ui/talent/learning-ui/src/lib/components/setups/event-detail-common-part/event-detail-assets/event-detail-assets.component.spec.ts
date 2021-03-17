import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailAssetsComponent } from './event-detail-assets.component';

describe('EventDetailAssetsComponent', () => {
  let component: EventDetailAssetsComponent;
  let fixture: ComponentFixture<EventDetailAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
