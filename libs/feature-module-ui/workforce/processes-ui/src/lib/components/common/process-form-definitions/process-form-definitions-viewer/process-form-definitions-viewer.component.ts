import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { IProcessFormDefinition } from '@nutela/models/workforce/employee-profiles';
import { HideViewerProcessFormDefinition } from '../../../../store/processes/process-form-definition';


@Component({
  selector: 'x365-fm-workforce-process-form-definitions-viewer',
  templateUrl: './process-form-definitions-viewer.component.html',
  styleUrls: ['./process-form-definitions-viewer.component.scss']
})
export class ProcessFormDefinitionsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProcessFormDefinition;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerProcessFormDefinition());
  }
  
}
