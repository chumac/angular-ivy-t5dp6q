import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentAttachmentComponent } from './comment-attachment.component';

describe('CommentAttachmentComponent', () => {
  let component: CommentAttachmentComponent;
  let fixture: ComponentFixture<CommentAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
