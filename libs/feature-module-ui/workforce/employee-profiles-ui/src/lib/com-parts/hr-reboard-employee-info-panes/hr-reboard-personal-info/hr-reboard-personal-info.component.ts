import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import {  getSelectOptionData } from '@nutela/store/modules/foundation';
import { Observable } from 'rxjs/internal/Observable';
import { ISelectOptionData } from '@nutela/models/common';
import { IGeneral } from '@nutela/models/workforce/employee-profiles';
import { HrReboardPersonalInformationService } from '../../../components/hr-reboard-data/services';
import { LoadDataHrReboardGeneral, showEditorHrReboardGeneral, showViewerHrReboardGeneral, getHrReboardGeneralData, LoadDocumentHrReboardGeneral, getHrReboardGeneralDocument, HideEditorHrReboardGeneral, HideViewerHrReboardGeneral } from '../../../store/hr-reboard-data';
import { GENERAL, PROFILE_AVATAR } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-personal-info',
  templateUrl: './hr-reboard-personal-info.component.html',
  styleUrls: ['./hr-reboard-personal-info.component.scss']
})
export class HrReboardPersonalInfoComponent implements OnInit {


  imageBaseHeader = `${GENERAL.pngBase64Header}`;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;
  generalData$: Observable<IGeneral>;
  document$:  Observable<any>;

  @Input() data: any = null;
  @Input() reboardMode: number;
  @Input() employeeId: number;

  constructor(private personalInformationService: HrReboardPersonalInformationService, private store: Store<IAppState>) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorHrReboardGeneral));
    this.showViewer$ = this.store.pipe(select(showViewerHrReboardGeneral));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.generalData$ = this.store.pipe(select(getHrReboardGeneralData));
    this.document$ = this.store.pipe(select(getHrReboardGeneralDocument));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataHrReboardGeneral({employeeId: this.employeeId}))
  }

  get profileImage(): string {
    return this.data.image_profile ? `${this.imageBaseHeader}${this.data.image_profile}` : PROFILE_AVATAR.uri;
  }

  get fileImage(): string {
    return this.data.image_personal ? `${this.imageBaseHeader}${this.data.image_personal}` : PROFILE_AVATAR.uri;
  }

  canEdit(): boolean {
    let status: boolean;
    if (this.reboardMode === 1 || this.reboardMode === 2) {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

  showEditor() {
    this.personalInformationService.showEditor();
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHrReboardGeneral());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHrReboardGeneral());
  }
}
