import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IObjectiveDto } from '@nutela/models/talent/performance';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { HideViewerMultiEmployeeLoadObjectives } from '../../../store/planning';


@Component({
  selector: 'x365-fm-talent-multi-employee-load-objectives-viewer',
  templateUrl: './multi-employee-load-objectives-viewer.component.html',
  styleUrls: ['./multi-employee-load-objectives-viewer.component.scss']
})
export class MultiEmployeeLoadObjectivesViewerComponent implements OnInit {

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
    this.store.dispatch(new HideViewerMultiEmployeeLoadObjectives());
  }

}
