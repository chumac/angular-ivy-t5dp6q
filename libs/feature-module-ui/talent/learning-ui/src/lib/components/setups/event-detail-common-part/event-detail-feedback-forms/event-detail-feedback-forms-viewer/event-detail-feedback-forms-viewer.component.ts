import { Component, OnInit, Input } from '@angular/core';
import { IEventDetailFeedbackForms } from '@nutela/models/talent/learning';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFeedbackForms } from 'libs/feature-module-ui/talent/learning-ui/src/store';

@Component({
  selector: 'x365-fm-talent-event-detail-feedback-forms-viewer',
  templateUrl: './event-detail-feedback-forms-viewer.component.html',
  styleUrls: ['./event-detail-feedback-forms-viewer.component.scss']
})
export class EventDetailFeedbackFormsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IEventDetailFeedbackForms;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerFeedbackForms());
  }

}
