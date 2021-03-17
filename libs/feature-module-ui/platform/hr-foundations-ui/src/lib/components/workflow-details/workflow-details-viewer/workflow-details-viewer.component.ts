import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { HideViewerWorkDetails, IWorkDetailsState } from '../../../store/workflow-details';
import { IWorkDetails } from '@nutela/models/foundation';


@Component({
  selector: 'x365-fm-plf-hrf-workflow-details-viewer',
  templateUrl: './workflow-details-viewer.component.html',
  styleUrls: ['./workflow-details-viewer.component.scss']
})
export class WorkflowDetailsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IWorkDetails;

  constructor(public utilService: UtilService, private store: Store<IWorkDetailsState>) { }

  ngOnInit() {
  }

  onDoneClicked() {
     this.store.dispatch(new HideViewerWorkDetails());
  }

}








 
  