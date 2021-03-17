import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsEditorComponent } from './subscriptions-editor.component';

describe('SubscriptionsEditorComponent', () => {
  let component: SubscriptionsEditorComponent;
  let fixture: ComponentFixture<SubscriptionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionsEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
