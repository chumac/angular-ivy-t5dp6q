import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IWorkflowDefinition } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerWorkflowDefinition } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-workflow-definitions-viewer',
  templateUrl: './workflow-definitions-viewer.component.html',
  styleUrls: ['./workflow-definitions-viewer.component.scss']
})
export class WorkflowDefinitionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IWorkflowDefinition;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerWorkflowDefinition());
  }
  
}
