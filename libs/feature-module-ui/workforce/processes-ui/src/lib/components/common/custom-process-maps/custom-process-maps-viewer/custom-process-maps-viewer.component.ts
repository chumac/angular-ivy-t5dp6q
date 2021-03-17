import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { ICustomProcessMap } from '@nutela/models/workforce/employee-profiles';
import { HideViewerCustomProcessMap } from '../../../../store/processes/custom-process-map';


@Component({
  selector: 'x365-fm-workforce-custom-process-maps-viewer',
  templateUrl: './custom-process-maps-viewer.component.html',
  styleUrls: ['./custom-process-maps-viewer.component.scss']
})
export class CustomProcessMapsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ICustomProcessMap;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerCustomProcessMap());
  }
  
}
