import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IPlanOption } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerPlanOption } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-plan-options-viewer',
  templateUrl: './plan-options-viewer.component.html',
  styleUrls: ['./plan-options-viewer.component.scss']
})
export class PlanOptionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPlanOption;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerPlanOption());
  }
  
}
