import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';

// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/pairwise';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { NavMenuItemTypes } from '../../main/enumerations';
import { Title } from '@angular/platform-browser';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { HrReboardPersonalInformationService, HrReboardContactService, HrReboardIdentificationService, HrReboardPaymentService, HrReboardWorkHistoryService, HrReboardEducationalHistoryService, HrReboardProfessionalQualificationService, HrReboardDependantService, HrReboardPersonalRefereeService, HrReboardProfilePictureService, HrReboardGuarantorService, HrReboardFamilyService, HrReboardBeneficiaryService } from './services';
import { IAppState } from '@nutela/store/app-state';
import { isLoadingEmployeeData, LoadingEmployeeData, CancelReboardEmployee, LoadHrReboardEmployeeDetails, getReboardEmployeeDetails, getReboardWorkflowMessage, RetrieveReboardEmployee, isProcessingRetrieve, ProcessingReboardRetrieve } from '../../store/employees-data-home';
import {
  getComprehensiveData, LoadEmployeeFilePhoto, LoadComprehensiveData,
  getEmployeePhoto,
  LoadEmployeePhoto,
  getEmployeeReboardMode, } from '../../store/employee-detailed-area';
import { showDeclineEditor, showApproveEditor, ShowApproveEditor, ShowDeclineEditor, HideApproveEditor, HideDeclineEditor } from 'libs/feature-module-ui/approvals-ui/src/lib/store/approval';
import { ApproveEditorComponent } from 'libs/feature-module-ui/approvals-ui/src/lib/components/approvals/approve-editor/approve-editor.component';
import { DeclineEditorComponent } from 'libs/feature-module-ui/approvals-ui/src/lib/components/approvals/decline-editor/decline-editor.component';
import { take, map, filter, pairwise } from 'rxjs/operators';
import { ApprovalsService } from 'libs/feature-module-ui/approvals-ui/src/lib/components/approvals/approvals.service';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { IWorkflowMessage } from '@nutela/models/foundation';
import { getWorkflowMessages } from '@nutela/store/modules/workforce/employee-profiles';
import { RouteUtilService, RouteEventsService } from '@nutela/core-services';
import { DialogService } from '@nutela/shared/ui';

@Component({
  selector: 'x365-fm-workforce-hr-reboard-data',
  templateUrl: './hr-reboard-data.component.html',
  styleUrls: ['./hr-reboard-data.component.scss'],
  providers: [HrReboardPersonalInformationService, HrReboardContactService, HrReboardIdentificationService, HrReboardPaymentService, HrReboardWorkHistoryService, HrReboardFamilyService, HrReboardGuarantorService, HrReboardEducationalHistoryService, HrReboardProfessionalQualificationService, HrReboardDependantService, HrReboardPersonalRefereeService, HrReboardProfilePictureService, HrReboardBeneficiaryService, ApprovalsService],
})

export class HrReboardDataComponent implements OnInit, OnDestroy {
  selectedModuleId = NavMenuItemTypes.PERSONAL_INFORMATION;

  addButtonStatus: boolean;
  editButtonStatus: boolean;
  awaitingButtonStatus: boolean;
  deleteButtonStatus: boolean;
  refreshButton: boolean;
  employeeId: number

  comprehensiveData$: Observable<IComprehensiveData>;
  employeePhoto$: Observable<any>;
  reboardMode$: Observable<number>;
  isLoading$: Observable<boolean>;
  isProcessingRetrieve$: Observable<boolean>;

  showApproveEditor$: Observable<boolean>;
  showDeclineEditor$: Observable<boolean>;
  workflowMessage$: Observable<IWorkflowMessage>;
  activePersonnel$: Observable<ISelectOption[]>;
  employeeReboardDetails$: Observable<any>;

  @ViewChild('approveEditor') approveEditor: ApproveEditorComponent;
  @ViewChild('declineEditor') declineEditor: DeclineEditorComponent;
  previousUrl: any;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private personalInformationService: HrReboardPersonalInformationService,
    private contactService: HrReboardContactService,
    private identificationService: HrReboardIdentificationService,
    private paymentService: HrReboardPaymentService,
    private workHistoryService: HrReboardWorkHistoryService,
    private educationalHistoryService: HrReboardEducationalHistoryService,
    private professionalQualificationService: HrReboardProfessionalQualificationService,
    private dependantService: HrReboardDependantService,
    private beneficiaryService: HrReboardBeneficiaryService,
    private personalRefereeService: HrReboardPersonalRefereeService,
    private familyService: HrReboardFamilyService,
    private guarantorService: HrReboardGuarantorService,
    private profilePictureService: HrReboardProfilePictureService,
    private store: Store<IAppState>,
    private router: Router,
    private route: ActivatedRoute,
    public approvalsService: ApprovalsService,
    private routeEventsService: RouteEventsService,
    private dialogService: DialogService
  ) {
    titleService.setTitle(`${'HR Reboard'}${this.partialDocumentTitle}`);
    this.employeeId = this.route.snapshot.params.employeeId;
  }

  ngOnInit() {
    this.onNavMenuItemSelected(NavMenuItemTypes.PERSONAL_INFORMATION);
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadComprehensiveData({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadEmployeePhoto({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadEmployeeFilePhoto({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadHrReboardEmployeeDetails({ employeeId: this.employeeId }));
    // this.store.dispatch(new LoadDataHrReboardGeneral());
    // this.store.dispatch(new LoadDataHrReboardContact());
    // this.store.dispatch(new LoadDataHrReboardPayment());
    // this.store.dispatch(new LoadDataHrReboardIdentification());
    // this.store.dispatch(new LoadDataHrReboardWorkHistory());
    // this.store.dispatch(new LoadDataHrReboardEducation());
    // this.store.dispatch(new LoadDataHrReboardProfessionalQualifications());
    // this.store.dispatch(new LoadDataHrReboardDependant());
    // this.store.dispatch(new LoadDataHrReboardBeneficiary());
    // this.store.dispatch(new LoadDataHrReboardReferee());
    // this.store.dispatch(new LoadDataHrReboardFamily());
    // this.store.dispatch(new LoadDataHrReboardGuarantor());
    // this.store.dispatch(new LoadDocumentHrReboardGeneral());
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.employeePhoto$ = this.store.pipe(select(getEmployeePhoto));
    this.isLoading$ = this.store.pipe(select(isLoadingEmployeeData));
    this.isProcessingRetrieve$ = this.store.pipe(select(isProcessingRetrieve));
    this.reboardMode$ = this.store.pipe(select(getEmployeeReboardMode));
    this.employeeReboardDetails$ = this.store.pipe(select(getReboardEmployeeDetails));
    this.showApproveEditor$ = this.store.pipe(select(showApproveEditor));
    this.showDeclineEditor$ = this.store.pipe(select(showDeclineEditor));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnelHR));
    this.workflowMessage$ = this.store.pipe(select(getReboardWorkflowMessage));
  }

  onNavMenuItemSelected($event) {
    this.selectedModuleId = $event;

    switch ($event) {
      case NavMenuItemTypes.PERSONAL_INFORMATION:
      case NavMenuItemTypes.PROFILE_PICTURE:
      case NavMenuItemTypes.CONTACT:
      case NavMenuItemTypes.IDENTIFICATION:
      case NavMenuItemTypes.PAYMENT: {
        this.setFormMode();
        break;
      }
      case NavMenuItemTypes.WORK_HISTORY:
      case NavMenuItemTypes.EDUCATIONAL_HISTORY:
      case NavMenuItemTypes.PROFESSIONAL_QUALIFICATIONS:
      case NavMenuItemTypes.DEPENDANTS:
      case NavMenuItemTypes.BENEFICIARIES:
      case NavMenuItemTypes.PERSONAL_REFEREES:
      case NavMenuItemTypes.GUARANTORS:
      case NavMenuItemTypes.FAMILY: {
        this.setTableMode();
        break;
      }
      default: {
        this.setAllButtonsMode();
        break;
      }
    }
  }

  // getItemsAwaitingMyActionWorkflowMessages$(rowId: number): Observable<IWorkflowMessage[]> {
  //   return this.workflowMessage$.pipe(
  //     map(c => c.filter(val => val.msg_id === rowId)));
  // }


  showAddButton() {
    this.comprehensiveData$.subscribe(val => {
      if (!val.contact_info) {

      }
    })
  }

  setFormMode() {
    this.addButtonStatus = false;
    this.awaitingButtonStatus = true;
    this.editButtonStatus = true;
    this.refreshButton = true;
  }

  setTableMode() {
    this.addButtonStatus = true;
    this.editButtonStatus = false;
    this.awaitingButtonStatus = false;
    this.refreshButton = true;
  }

  setAllButtonsMode() {
    this.addButtonStatus = true;
    this.editButtonStatus = true;
    this.refreshButton = true;
  }

  onApproveClicked() {
    this.approveEditor.data = null;
    this.workflowMessage$.pipe(take(1))
      .subscribe((result) => {
        this.approveEditor.data = [result];
        this.store.dispatch(new ShowApproveEditor());
        this.approveEditor.fs.queueId = this.approvalsService.queueId;
      }
      );
  }

  onDeclineClicked() {
    this.declineEditor.data = null;
    this.workflowMessage$.pipe(take(1))
      .subscribe((result) => {
        this.declineEditor.data = [result];
        this.store.dispatch(new ShowDeclineEditor());
        this.declineEditor.fs.queueId = this.approvalsService.queueId;
      }
      );
  }

  onCancelApproveEditor() {
    this.store.dispatch(new HideApproveEditor());
  }

  onCancelDeclineEditor() {
    this.store.dispatch(new HideDeclineEditor());
  }

  onButtonClicked($event) {
    if ($event === 'APPROVE') {
      this.dialogService.show(this.dialogService.options(), `This action will submit the record and approve it. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.onApproveClicked()
        }
      });

    } else if ($event === 'DECLINE') {
      this.dialogService.show(this.dialogService.options(), `This action will decline the record awaiting approval. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.onDeclineClicked();
        }
      })
    } else if ($event === 'CANCEL') {
      this.dialogService.show(this.dialogService.options(), `This action will submit the record for approval. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new LoadingEmployeeData());
          this.store.dispatch(new CancelReboardEmployee({ employeeId: this.employeeId }));
        }
      })
    } else if ($event === 'RETRIEVE') {
      this.dialogService.show(this.dialogService.options(), `This action will submit the record for approval. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingReboardRetrieve());
          this.store.dispatch(new RetrieveReboardEmployee({ employeeId: this.employeeId }));
        }
      })
    } else {
      switch (this.selectedModuleId) {
        case NavMenuItemTypes.PERSONAL_INFORMATION: {
          this.personalInformationService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.PROFILE_PICTURE: {
          this.profilePictureService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.CONTACT: {
          this.contactService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.IDENTIFICATION: {
          this.identificationService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.PAYMENT: {
          this.paymentService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.WORK_HISTORY: {
          this.workHistoryService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.EDUCATIONAL_HISTORY: {
          this.educationalHistoryService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.PROFESSIONAL_QUALIFICATIONS: {
          this.professionalQualificationService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.DEPENDANTS: {
          this.dependantService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.BENEFICIARIES: {
          this.beneficiaryService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.PERSONAL_REFEREES: {
          this.personalRefereeService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.FAMILY: {
          this.familyService.commandProcessor($event, this.employeeId);
          break;
        }
        case NavMenuItemTypes.GUARANTORS: {
          this.guarantorService.commandProcessor($event, this.employeeId);
          break;
        }
        default:
          break;
      }
    }
  }

  backButtonClicked() {
    this.routeEventsService.goBack();
  }


  ngOnDestroy() {
    // this.store.dispatch(new ClearApprovedDataMapEducation());
  }
}


