import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IRatingAssetDefinition } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerRatingAssetDefinition } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-rating-asset-definitions-viewer',
  templateUrl: './rating-asset-definitions-viewer.component.html',
  styleUrls: ['./rating-asset-definitions-viewer.component.scss']
})
export class RatingAssetDefinitionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IRatingAssetDefinition;
  @Input() public pageTitle: string;


  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerRatingAssetDefinition());
  }
  
}
