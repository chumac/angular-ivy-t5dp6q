import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IPerformanceRecommendation } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerRecommendation } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-recommendations-viewer',
  templateUrl: './recommendations-viewer.component.html',
  styleUrls: ['./recommendations-viewer.component.scss']
})
export class RecommendationsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPerformanceRecommendation;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerRecommendation());
  }
  
}
