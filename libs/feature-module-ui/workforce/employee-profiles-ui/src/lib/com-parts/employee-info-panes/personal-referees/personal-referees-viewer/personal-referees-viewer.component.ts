
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IReferee } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerReferee, ClearDocumentReferee, ClearViewerPhotoReferee } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-personal-referees-viewer',
  templateUrl: './personal-referees-viewer.component.html',
  styleUrls: ['./personal-referees-viewer.component.scss']
})
export class PersonalRefereesViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IReferee;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentReferee());
    this.store.dispatch(new HideViewerReferee());
    this.store.dispatch(new ClearViewerPhotoReferee());
  }
}
