import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IFeedbackRating } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFeedbackRating } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-feedback-ratings-viewer',
  templateUrl: './feedback-ratings-viewer.component.html',
  styleUrls: ['./feedback-ratings-viewer.component.scss']
})
export class FeedbackRatingsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFeedbackRating;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerFeedbackRating());
  }
  
}
