import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerHrCustomDataForm } from '../../../../store/employee-detailed-area';
import { IHrCustomDataForm } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-workforce-hr-custom-data-forms-viewer',
  templateUrl: './hr-custom-data-forms-viewer.component.html',
  styleUrls: ['./hr-custom-data-forms-viewer.component.scss']
})
export class HrCustomDataFormsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IHrCustomDataForm;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerHrCustomDataForm());
  }
  
}
