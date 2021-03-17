
import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { UtilService } from '@nutela/core-services';

import { IProfessionalQualification } from '@nutela/models/workforce/employee-profiles';
import { IEmployeesProfileState } from '../../../../store/root';
import { ClearDocumentProfessionalQualifications, HideViewerProfessionalQualifications } from '../../../../store/employee-detailed-area';


@Component({
  selector: 'x365-fm-workforce-hr-professional-qualification-viewer',
  templateUrl: './hr-professional-qualification-viewer.component.html',
  styleUrls: ['./hr-professional-qualification-viewer.component.scss']
})
export class HrProfessionalQualificationViewerComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IProfessionalQualification;
  @Input() public dataDoc: any;

  constructor(public utilService: UtilService, private store: Store<IEmployeesProfileState>,) {}

  ngOnInit() {}

  onDoneClicked() {
    this.store.dispatch(new ClearDocumentProfessionalQualifications());
    this.store.dispatch(new HideViewerProfessionalQualifications());
  }
}
