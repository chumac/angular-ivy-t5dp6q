import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IObjectiveDto } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerObjective } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-objectives-viewer',
  templateUrl: './objectives-viewer.component.html',
  styleUrls: ['./objectives-viewer.component.scss']
})
export class ObjectivesViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IObjectiveDto;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerObjective());
  }
  
}
