
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IBeneficiary } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerBeneficiary, ClearViewerPhotoBeneficiary } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-beneficiaries-viewer',
  templateUrl: './beneficiaries-viewer.component.html',
  styleUrls: ['./beneficiaries-viewer.component.scss']
})
export class BeneficiariesViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IBeneficiary;
  @Input() public dataDoc: any;
  @Input() public imageData: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new HideViewerBeneficiary());
    this.store.dispatch(new ClearViewerPhotoBeneficiary());
  }
}
