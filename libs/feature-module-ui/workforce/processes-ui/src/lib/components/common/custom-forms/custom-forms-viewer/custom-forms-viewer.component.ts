import { Component, OnInit, Input } from '@angular/core';
 
import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerCustomForm } from '../../../../store/processes/custom-form';
import { ICustomForm } from '@nutela/models/workforce/employee-profiles';


@Component({
  selector: 'x365-fm-talent-custom-forms-viewer',
  templateUrl: './custom-forms-viewer.component.html',
  styleUrls: ['./custom-forms-viewer.component.scss']
})
export class CustomFormsViewerComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ICustomForm;

  constructor(
    public utilService: UtilService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new HideViewerCustomForm());
  }
  
}
