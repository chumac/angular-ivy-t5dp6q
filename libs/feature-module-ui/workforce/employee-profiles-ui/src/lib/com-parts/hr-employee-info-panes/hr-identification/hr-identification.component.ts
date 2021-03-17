import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IIdentification } from '@nutela/models/workforce/employee-profiles';
import { Store, select } from '@ngrx/store';
import { isUndefined } from 'util';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation } from '@nutela/core-services';
import { LoadApprovedDataHRIdentification, LoadAwaitingApprovalDataHRIdentification, showEditorIdentification, showViewerIdentification, getIdentificationApprovedData, getIdentificationAwaitingApprovalData, ShowEditorHRIdentification, HideEditorHRIdentification, HideViewerHRIdentification, getIdentificationPosition, getIdentificationGrade, getIdentificationPayGroup, getIdentificationJobTitle, getIdentificationActingJobTitle, LoadPosition, LoadGrade, LoadPayGroup, LoadJobTitle, LoadActingJobTitle, getIdentificationPaymentMode, LoadPaymentMode, getIdentificationReportTo, getIdentificationBackUpOfficer, LoadReportTo, LoadBackUpOfficer } from '../../../store/employee-detailed-area';
import { IEmployeesProfileState } from '../../../store/root/employees-profile.state';
import { ISelectOption } from '@nutela/models/core-data';
import { take } from 'rxjs/operators';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'x365-fm-workforce-hr-identification',
  templateUrl: './hr-identification.component.html',
  styleUrls: ['./hr-identification.component.scss']
})
export class HrIdentificationComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;

  signatureImage$: Observable<any>;

  approvedData$: Observable<IIdentification>;
  awaitingApprovalData$: Observable<IIdentification>;
  positionData$: Observable<ISelectOption[]>;
  gradeData$: Observable<ISelectOption[]>;
  payGroup$: Observable<ISelectOption[]>;
  jobTitle$: Observable<ISelectOption[]>;
  actingJobTitle$: Observable<ISelectOption[]>;
  paymentMode$:Observable<ISelectOption[]>;
  reportTo$:Observable<ISelectOption[]>;
  backUpOfficer$:Observable<ISelectOption[]>;

  @Input() data: any = null;
  dat: any = null;
  @Input() employeeId: number;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,
              private store: Store<IEmployeesProfileState>,) {
                titleService.setTitle(
                  `${'HR Identification'}${this.partialDocumentTitle}`
                );
              }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
    this.optionsSelect();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataHRIdentification({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadAwaitingApprovalDataHRIdentification({ employeeId: this.employeeId }));

    this.store.dispatch(new LoadPosition());
    this.store.dispatch(new LoadGrade());
    this.store.dispatch(new LoadJobTitle());
    this.store.dispatch(new LoadActingJobTitle());
    this.store.dispatch(new LoadPaymentMode());
    this.store.dispatch(new LoadReportTo());
    this.store.dispatch(new LoadBackUpOfficer());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorIdentification));
    this.showViewer$ = this.store.pipe(select(showViewerIdentification));

    this.approvedData$ = this.store.pipe(select(getIdentificationApprovedData));
    this.awaitingApprovalData$ = this.store.pipe(select(getIdentificationAwaitingApprovalData));
    this.approvedData$.subscribe(res=>{
      this.dat=res;
    })
  }

  optionsSelect(){
    this.positionData$=this.store.pipe(select(getIdentificationPosition));
    this.payGroup$=this.store.pipe(select(getIdentificationPayGroup));
    this.jobTitle$=this.store.pipe(select(getIdentificationJobTitle));
    this.actingJobTitle$=this.store.pipe(select(getIdentificationActingJobTitle));
    this.paymentMode$=this.store.pipe(select(getIdentificationPaymentMode));
    this.reportTo$=this.store.pipe(select(getIdentificationReportTo));
    this.backUpOfficer$=this.store.pipe(select(getIdentificationBackUpOfficer));
  }

  showEditor() {
    this.awaitingApprovalData$.pipe(take(1)).subscribe((data: IIdentification) => {

      if (isUndefined(data)) {
        this.store.dispatch(new ShowEditorHRIdentification());
      } else {
        this.store.dispatch(new ShowToast({title: null, message: 'You have data awaiting approval. You must discard pending data before you can update your data again.', options: toastOptionsInformation()}));
      }
    });
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorHRIdentification());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerHRIdentification());
  }
}
