import { Component, OnInit, Input } from '@angular/core';
import { IEventDetailFacilitators } from '@nutela/models/talent/learning';
import { Store } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFacilitators } from 'libs/feature-module-ui/talent/learning-ui/src/store';

@Component({
  selector: 'x365-fm-talent-event-detail-facilitators-viewer',
  templateUrl: './event-detail-facilitators-viewer.component.html',
  styleUrls: ['./event-detail-facilitators-viewer.component.scss']
})
export class EventDetailFacilitatorsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IEventDetailFacilitators;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerFacilitators());
  }

}
