import { Component, OnInit, Input } from '@angular/core';
import { ITrainingHistory } from '@nutela/models/workforce/employee-profiles';
import { HideViewerTrainingHistory } from '../../../../store/employee-detailed-area';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../../store';


@Component({
  selector: 'x365-fm-workforce-hr-training-history-viewer',
  templateUrl: './hr-training-history-viewer.component.html',
  styleUrls: ['./hr-training-history-viewer.component.scss']
})
export class HrTrainingHistoryViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITrainingHistory;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}

  ngOnInit() { }

  onDoneClicked() {
    this.store.dispatch(new HideViewerTrainingHistory());
  }
}
