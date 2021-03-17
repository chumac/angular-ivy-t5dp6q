
import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IGuarantor } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerGuarantor, ClearDocumentGuarantor, ClearViewerPhotoGuarantor, LoadApprovedPhotoGuarantor, getGuarantorApprovedPhoto } from '@nutela/store/modules/workforce/employee-profiles';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'x365-fm-workforce-guarantors-viewer',
  templateUrl: './guarantors-viewer.component.html',
  styleUrls: ['./guarantors-viewer.component.scss']
})
export class GuarantorsViewerComponent implements OnInit {
  approvalPhoto$: Observable<any>;
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IGuarantor;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {
  } 

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentGuarantor());
    this.store.dispatch(new HideViewerGuarantor());
    this.store.dispatch(new ClearViewerPhotoGuarantor());
  }
}
