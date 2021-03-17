import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IWorkflowStep } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerWorkflowStep } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-workflow-steps-viewer',
  templateUrl: './workflow-steps-viewer.component.html',
  styleUrls: ['./workflow-steps-viewer.component.scss']
})
export class WorkflowStepsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IWorkflowStep;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerWorkflowStep());
  }
  
}
