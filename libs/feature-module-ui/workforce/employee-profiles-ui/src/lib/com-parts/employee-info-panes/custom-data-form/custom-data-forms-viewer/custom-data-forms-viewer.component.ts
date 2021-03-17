import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerCustomDataForm } from '@nutela/store/modules/workforce/employee-profiles';
import { ICustomDataForm } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-workforce-custom-data-forms-viewer',
  templateUrl: './custom-data-forms-viewer.component.html',
  styleUrls: ['./custom-data-forms-viewer.component.scss']
})
export class CustomDataFormsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ICustomDataForm;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerCustomDataForm());
  }
  
}
