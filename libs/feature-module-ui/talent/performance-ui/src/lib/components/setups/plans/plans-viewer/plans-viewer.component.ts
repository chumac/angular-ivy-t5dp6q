import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IPlan } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerPlan } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-plans-viewer',
  templateUrl: './plans-viewer.component.html',
  styleUrls: ['./plans-viewer.component.scss']
})
export class PlansViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IPlan;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerPlan());
  }
  
}
