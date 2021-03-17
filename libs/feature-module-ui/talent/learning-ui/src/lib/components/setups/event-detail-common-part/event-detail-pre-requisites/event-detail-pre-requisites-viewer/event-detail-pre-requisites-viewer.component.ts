import { Component, OnInit, Input } from '@angular/core';
import { IEventDetailPreRequisites } from '@nutela/models/talent/learning';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerPreRequisites } from 'libs/feature-module-ui/talent/learning-ui/src/store';

@Component({
  selector: 'x365-fm-talent-event-detail-pre-requisites-viewer',
  templateUrl: './event-detail-pre-requisites-viewer.component.html',
  styleUrls: ['./event-detail-pre-requisites-viewer.component.scss']
})
export class EventDetailPreRequisitesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IEventDetailPreRequisites;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerPreRequisites());
  }

}
