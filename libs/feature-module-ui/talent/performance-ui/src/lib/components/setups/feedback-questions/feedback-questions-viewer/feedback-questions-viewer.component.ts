import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IFeedbackQuestion } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFeedbackQuestion } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-feedback-questions-viewer',
  templateUrl: './feedback-questions-viewer.component.html',
  styleUrls: ['./feedback-questions-viewer.component.scss']
})
export class FeedbackQuestionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFeedbackQuestion;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerFeedbackQuestion());
  }
  
}
