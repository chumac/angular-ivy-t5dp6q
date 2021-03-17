import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IFeedbackSession } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFeedbackSession } from '../../../../store';


@Component({
  selector: 'x365-feedback-setup-viewer-feedback-viewer',
  templateUrl: './feedback-viewer.component.html',
  styleUrls: ['./feedback-viewer.component.scss']
})
export class FeedbackViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFeedbackSession;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerFeedbackSession());
  }
  
}

