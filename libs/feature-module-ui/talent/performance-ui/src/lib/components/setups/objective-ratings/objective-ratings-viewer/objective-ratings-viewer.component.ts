import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IObjectiveRating } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerObjectiveRating } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-objective-ratings-viewer',
  templateUrl: './objective-ratings-viewer.component.html',
  styleUrls: ['./objective-ratings-viewer.component.scss']
})
export class ObjectiveRatingsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IObjectiveRating;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerObjectiveRating());
  }
  
}
