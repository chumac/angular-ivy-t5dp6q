import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../store';
import { Store } from '@ngrx/store';
import { HideViewerEmployeesDataSummary, ClearViewerPhotoEmployeesDataSummary, ClearEmployeesDataItem } from '../../../../store/employees-data-home';


@Component({
  selector: 'x365-fm-workforce-summary-viewer',
  templateUrl: './summary-viewer.component.html',
  styleUrls: ['./summary-viewer.component.scss']
})
export class SummaryViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>) {}
  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerEmployeesDataSummary());
    this.store.dispatch(new ClearViewerPhotoEmployeesDataSummary());
    this.store.dispatch(new ClearEmployeesDataItem());
  }
}
