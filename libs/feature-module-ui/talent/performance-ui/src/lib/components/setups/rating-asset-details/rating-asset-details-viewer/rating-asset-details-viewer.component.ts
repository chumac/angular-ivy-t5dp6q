import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IRatingAssetDetail } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerRatingAssetDetail } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-rating-asset-details-viewer',
  templateUrl: './rating-asset-details-viewer.component.html',
  styleUrls: ['./rating-asset-details-viewer.component.scss']
})
export class RatingAssetDetailsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IRatingAssetDetail;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerRatingAssetDetail());
  }
  
}
