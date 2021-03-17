
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { IAppState } from '@nutela/store/app-state';
import { HideViewerProfessionalQualifications, ClearDocumentProfessionalQualifications } from '@nutela/store/modules/workforce/employee-profiles';

@Component({
  selector: 'x365-fm-workforce-professional-qualifications-viewer',
  templateUrl: './professional-qualifications-viewer.component.html',
  styleUrls: ['./professional-qualifications-viewer.component.scss']
})
export class ProfessionalQualificationsViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfessionalQualification;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IAppState>) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentProfessionalQualifications());
    this.store.dispatch(new HideViewerProfessionalQualifications());
  }
}
