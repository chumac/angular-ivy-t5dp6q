import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IPerspectiveRating } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerPerspectiveRating } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-perspective-ratings-viewer',
  templateUrl: './perspective-ratings-viewer.component.html',
  styleUrls: ['./perspective-ratings-viewer.component.scss']
})
export class PerspectiveRatingsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPerspectiveRating;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerPerspectiveRating());
  }
  
}
