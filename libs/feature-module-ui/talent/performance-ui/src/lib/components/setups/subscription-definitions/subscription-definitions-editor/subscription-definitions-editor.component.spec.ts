import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDefinitionsEditorComponent } from './subscriptionDefinitions-editor.component';

describe('SubscriptionDefinitionsEditorComponent', () => {
  let component: SubscriptionDefinitionsEditorComponent;
  let fixture: ComponentFixture<SubscriptionDefinitionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionDefinitionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionDefinitionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
