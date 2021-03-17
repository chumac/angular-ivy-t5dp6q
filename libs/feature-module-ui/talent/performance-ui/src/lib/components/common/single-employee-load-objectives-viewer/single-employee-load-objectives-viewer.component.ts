import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IObjectiveDto } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { HideViewerMultiEmployeeLoadObjectives, HideViewerSingleEmployeeLoadObjectives } from '../../../store/planning';


@Component({
  selector: 'x365-fm-talent-single-employee-load-objectives-viewer',
  templateUrl: './single-employee-load-objectives-viewer.component.html',
  styleUrls: ['./single-employee-load-objectives-viewer.component.scss']
})
export class SingleEmployeeLoadObjectivesViewerComponent implements OnInit {

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
    this.store.dispatch(new HideViewerSingleEmployeeLoadObjectives());
  }

}
