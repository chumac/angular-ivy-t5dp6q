
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IFamily } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerFamily, ClearViewerPhotoFamily, ClearDocumentFamily } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-family-viewer',
  templateUrl: './family-viewer.component.html',
  styleUrls: ['./family-viewer.component.scss']
})
export class FamilyViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IFamily;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerFamily());
    this.store.dispatch(new ClearViewerPhotoFamily());
    this.store.dispatch(new ClearDocumentFamily());
  }
}
