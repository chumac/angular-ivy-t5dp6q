import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { NavMenuItemTypes } from '../../main/enumerations';
import { Title } from '@angular/platform-browser';
import { getComprehensiveData, getEmployeePhoto, getMyReboardMode, getMyId } from '@nutela/store/modules/workforce/employee-profiles';

import { IComprehensiveData, IEmployeeSummary } from '@nutela/models/workforce/employee-profiles';
import { ReboardPersonalInformationService, ReboardContactService, ReboardIdentificationService, ReboardPaymentService, ReboardWorkHistoryService, ReboardEducationalHistoryService, ReboardProfessionalQualificationService, ReboardDependantService, ReboardPersonalRefereeService, ReboardProfilePictureService, ReboardGuarantorService, ReboardFamilyService, ReboardBeneficiaryService } from './services';
import { IAppState } from '@nutela/store/app-state';
import { isLoadingEmployeeData, LoadingEmployeeData, SubmitDataReboardEmployee, isProcessingStart, isProcessingRetrieve, ProcessingReboardRetrieve, ProcessingReboardStart, RetrieveMyReboard, StartMyReboard, CancelMyReboard, ProcessingMyReboardCancel, isProcessingCancel, isProcessingMyCancel, getMyReboardDetails, LoadMyReboardDetails } from '../../store/employees-data-home';
import { allowReboardCancel } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';
import { DialogService } from '@nutela/shared/ui';
import { DxScrollViewComponent } from 'devextreme-angular';
import { getAgreementTemplate, LoadAgreementTemplate } from 'libs/store/shared/src/lib/policy-agreement';
import { BUSINESS_OPTION } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-workforce-my-reboard-data',
  templateUrl: './my-reboard-data.component.html',
  styleUrls: ['./my-reboard-data.component.scss'],
  providers: [ReboardPersonalInformationService, ReboardContactService, ReboardIdentificationService, ReboardPaymentService, ReboardWorkHistoryService, ReboardFamilyService, ReboardGuarantorService, ReboardEducationalHistoryService, ReboardProfessionalQualificationService, ReboardDependantService, ReboardPersonalRefereeService, ReboardProfilePictureService, ReboardBeneficiaryService],
})
export class MyReboardDataComponent implements OnInit, OnDestroy {
  selectedModuleId = NavMenuItemTypes.PERSONAL_INFORMATION;

  addButtonStatus: boolean;
  editButtonStatus: boolean;
  awaitingButtonStatus: boolean;
  deleteButtonStatus: boolean;
  startButtonStatus: boolean;
  refreshButton: boolean;
  showAgreement: boolean = false;
  disableActions: boolean = false;
  disableAgreeButton: boolean = false;

  comprehensiveData$: Observable<IComprehensiveData>;
  employeePhoto$: Observable<any>;
  reboardMode$: Observable<number>;
  myId$: Observable<number>;
  isLoading$: Observable<boolean>;
  isProcessingRetrieve$: Observable<boolean>;
  isProcessingStart$: Observable<boolean>;
  isProcessingCancel$: Observable<boolean>;
  allowReboardCancel$: Observable<string>;
  agreementText$: Observable<string>;
  myReboardDetails$: Observable<IEmployeeSummary>;

  @ViewChild('scrollView', { read: DxScrollViewComponent }) scrollView: DxScrollViewComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private personalInformationService: ReboardPersonalInformationService,
    private contactService: ReboardContactService,
    private identificationService: ReboardIdentificationService,
    private paymentService: ReboardPaymentService,
    private workHistoryService: ReboardWorkHistoryService,
    private educationalHistoryService: ReboardEducationalHistoryService,
    private professionalQualificationService: ReboardProfessionalQualificationService,
    private dependantService: ReboardDependantService,
    private beneficiaryService: ReboardBeneficiaryService,
    private personalRefereeService: ReboardPersonalRefereeService,
    private familyService: ReboardFamilyService,
    private guarantorService: ReboardGuarantorService,
    private profilePictureService: ReboardProfilePictureService,
    private store: Store<IAppState>,
    private dialogService: DialogService
  ) {
    titleService.setTitle(`${'My Reboard Data'}${this.partialDocumentTitle}`);
  }

  ngOnInit() {
    this.onNavMenuItemSelected(NavMenuItemTypes.PERSONAL_INFORMATION);
    this.storeSelects();
    this.storeDispatches();
    this.initializeStartAndContinueButtonStatus()
  }

  initializeStartAndContinueButtonStatus() {
    this.startButtonStatus = true;
  }

  storeDispatches() {
    this.store.dispatch(new LoadAgreementTemplate({key: BUSINESS_OPTION.implementPolicy}));
    this.store.dispatch(new LoadMyReboardDetails());
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.employeePhoto$ = this.store.pipe(select(getEmployeePhoto));
    this.reboardMode$ = this.store.pipe(select(getMyReboardMode));
    this.myReboardDetails$ = this.store.pipe(select(getMyReboardDetails));
    this.myId$ = this.store.pipe(select(getMyId));
    this.isLoading$ = this.store.pipe(select(isLoadingEmployeeData));
    this.isProcessingStart$ = this.store.pipe(select(isProcessingStart));
    this.isProcessingCancel$ = this.store.pipe(select(isProcessingMyCancel));
    this.isProcessingRetrieve$ = this.store.pipe(select(isProcessingRetrieve));
    this.allowReboardCancel$ = this.store.pipe(select(allowReboardCancel));
    this.agreementText$ = this.store.pipe(select(getAgreementTemplate));
  }

  scroll() {
    this.scrollView.instance.scrollToElement(document.querySelector('#scorllEnd'));
  }

  onScroll(event) {
    console.log(event);
    if (event.reachedBottom) {
      console.log('reached buttom event', event.reachedBottom);
      this.disableAgreeButton = false;
    }

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

  agreeButtonClicked() {
    this.showAgreement = false;
    this.store.dispatch(new ProcessingReboardStart());
    this.store.dispatch(new StartMyReboard());
  }
  disagreeButtonClicked() {
    this.showAgreement = false;
  }

  onButtonClicked($event) {
    if ($event === 'SUBMIT') {
      this.dialogService.show(this.dialogService.options(), `This action will submit the record for approval. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new LoadingEmployeeData());
          this.store.dispatch(new SubmitDataReboardEmployee());
        }
      });
    } else if ($event === 'RETRIEVE') {
      this.dialogService.show(this.dialogService.options(), `This action will retrieve submitted reboarding. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingReboardRetrieve());
          this.store.dispatch(new RetrieveMyReboard());
        }
      });
    } else if ($event === 'START') {
      this.showAgreement = true;
    } else if ($event === 'CANCEL') {
      this.dialogService.show(this.dialogService.options(), `This action will cancel the reboarding process. Continue?`);

      this.dialogService.confirmed().pipe(take(1)).subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ProcessingMyReboardCancel());
          this.store.dispatch(new CancelMyReboard());
        }
      });
    } else {
      switch (this.selectedModuleId) {
        case NavMenuItemTypes.PERSONAL_INFORMATION: {
          this.personalInformationService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.PROFILE_PICTURE: {
          this.profilePictureService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.CONTACT: {
          this.contactService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.IDENTIFICATION: {
          this.identificationService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.PAYMENT: {
          this.paymentService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.WORK_HISTORY: {
          this.workHistoryService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.EDUCATIONAL_HISTORY: {
          this.educationalHistoryService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.PROFESSIONAL_QUALIFICATIONS: {
          this.professionalQualificationService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.DEPENDANTS: {
          this.dependantService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.BENEFICIARIES: {
          this.beneficiaryService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.PERSONAL_REFEREES: {
          this.personalRefereeService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.FAMILY: {
          this.familyService.commandProcessor($event);
          break;
        }
        case NavMenuItemTypes.GUARANTORS: {
          this.guarantorService.commandProcessor($event);
          break;
        }
        default:
          break;
      }
    }
  }

  ngOnDestroy() {
    // this.store.dispatch(new ClearApprovedDataMapEducation());
  }
}


