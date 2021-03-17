import { Component, OnInit, Input } from '@angular/core';
import { IEventDetailAssets } from '@nutela/models/talent/learning';
import { Store, select } from '@ngrx/store';
import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerAssets } from 'libs/feature-module-ui/talent/learning-ui/src/store';

@Component({
  selector: 'x365-fm-talent-event-detail-assets-viewer',
  templateUrl: './event-detail-assets-viewer.component.html',
  styleUrls: ['./event-detail-assets-viewer.component.scss']
})
export class EventDetailAssetsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IEventDetailAssets;
  @Input() public AssetsDocument: any;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  }

  onDoneClicked() {
    this.store.dispatch(new HideViewerAssets());
  }

}
