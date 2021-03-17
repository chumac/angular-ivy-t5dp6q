import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerGeneral } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-personal-information-viewer',
  templateUrl: './personal-information-viewer.component.html',
  styleUrls: ['./personal-information-viewer.component.scss']
})
export class PersonalInformationViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGeneral;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerGeneral());
  }
}
