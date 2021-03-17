import { Component, OnInit, Input } from '@angular/core';
import { ICommentBoxData } from '../../interfaces';

@Component({
  selector: 'x365-fm-talent-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {
  @Input() data: ICommentBoxData;

  constructor() { }

  ngOnInit() {
  }

  get isRecommendation(): boolean {
    if (this.data && (this.data.recommendation === null || this.data.recommendation ==='')) {
      return false;
    } else {
      return true;
    }
  }

  get isComment(): boolean {
    if (this.data && (this.data.Comment === null || this.data.Comment ==='')) {
      return false;
    } else {
      return true;
    }
  }

  get show(): boolean {
    if (this.isRecommendation || this.isComment) {
      return true;
    } else {
      return false;
    }
  }
}
