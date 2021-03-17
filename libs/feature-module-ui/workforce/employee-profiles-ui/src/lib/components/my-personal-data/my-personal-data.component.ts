import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import { NavMenuItemTypes } from '../../main/enumerations';
import { Title } from '@angular/platform-browser';
import { LoadApprovedDataGeneral, LoadAwaitingApprovalDataGeneral, getComprehensiveData, LoadApprovedDataContact, LoadAwaitingApprovalDataContact, getEmployeePhoto, getEmployeeName, ClearApprovedDataMapEducation, LoadApprovedDataIdentification, LoadAwaitingApprovalDataIdentification, LoadAwaitingApprovalDataPayment, LoadApprovedDataPayment, LoadDataProfessionalQualifications, LoadDataDependant, LoadDataBeneficiary, LoadDataReferee, LoadDataFamily, LoadDataGuarantor, LoadDataEducation, LoadDataWorkHistory, isAdmin, hasAgreedToPolicy, HasAgreedToPolicy } from '@nutela/store/modules/workforce/employee-profiles';

import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { PersonalInformationService, ContactService, IdentificationService, PaymentService, WorkHistoryService, EducationalHistoryService, ProfessionalQualificationService, DependantService, PersonalRefereeService, ProfilePictureService, CustomDataFormService } from './services';
import { BeneficiaryService } from './services/beneficiary.service';
import { FamilyService } from './services/family.service';
import { GuarantorService } from './services/guarantor.service';
import { IName } from '@nutela/models/core-data';
import { IAppState } from '@nutela/store/app-state';
import { implementPolicy } from '@nutela/store/modules/foundation';
import { take } from 'rxjs/operators';
import { BUSINESS_OPTION } from '@nutela/shared/app-global';
import { LoadAgreementTemplate, showPolicyModal, getEmployeeConsent, LoadEmployeeConsent } from 'libs/store/shared/src/lib/policy-agreement';

@Component({
  selector: 'x365-fm-workforce-my-personal-data',
  templateUrl: './my-personal-data.component.html',
  styleUrls: ['./my-personal-data.component.scss'],
  providers: [PersonalInformationService, ContactService, IdentificationService, PaymentService, WorkHistoryService, EducationalHistoryService, ProfessionalQualificationService, DependantService, PersonalRefereeService, ProfilePictureService],
})
export class MyPersonalDataComponent implements OnInit, OnDestroy {
  selectedModuleId = NavMenuItemTypes.PERSONAL_INFORMATION;

  addButtonStatus = false;
  showEnableEditButtonStatus = false;
  editButtonStatus = false;
  awaitingButtonStatus = false;
  deleteButtonStatus = false;
  refreshButton = true;
  showAgreement: boolean = false;

  comprehensiveData$: Observable<IComprehensiveData>;
  employeePhoto$: Observable<any>;
  implementPolicy$: Observable<string>;
  agreementTemplate$: Observable<string>;
  policyAgreed$: Observable<boolean>;
  showAgreement$: Observable<boolean>;
  employeeConsent$: Observable<boolean>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private personalInformationService: PersonalInformationService,
    private contactService: ContactService,
    private identificationService: IdentificationService,
    private paymentService: PaymentService,
    private workHistoryService: WorkHistoryService,
    private educationalHistoryService: EducationalHistoryService,
    private professionalQualificationService: ProfessionalQualificationService,
    private dependantService: DependantService,
    private beneficiaryService: BeneficiaryService,
    private personalRefereeService: PersonalRefereeService,
    private familyService: FamilyService,
    private guarantorService: GuarantorService,
    private profilePictureService: ProfilePictureService,
    private customDataFormService: CustomDataFormService,
    private store: Store<IAppState>
  ) {
    titleService.setTitle(`${'My Personal Data'}${this.partialDocumentTitle}`);
  }

  ngOnInit() {

    this.storeSelects();
    this.storeDispatches();
    this.onNavMenuItemSelected(NavMenuItemTypes.PERSONAL_INFORMATION);
  }

  storeDispatches() {
    // this.store.dispatch(new LoadAgreementTemplate({ key: BUSINESS_OPTION.implementPolicy }));

    this.store.dispatch(new LoadApprovedDataGeneral());
    this.store.dispatch(new LoadAwaitingApprovalDataGeneral());

    this.store.dispatch(new LoadApprovedDataContact());
    this.store.dispatch(new LoadAwaitingApprovalDataContact());

    this.store.dispatch(new LoadApprovedDataPayment());
    this.store.dispatch(new LoadAwaitingApprovalDataPayment());

    this.store.dispatch(new LoadApprovedDataIdentification());
    this.store.dispatch(new LoadAwaitingApprovalDataIdentification());

    this.store.dispatch(new LoadDataWorkHistory());
    this.store.dispatch(new LoadDataEducation());
    this.store.dispatch(new LoadDataProfessionalQualifications());
    this.store.dispatch(new LoadDataDependant());
    this.store.dispatch(new LoadDataBeneficiary());
    this.store.dispatch(new LoadDataReferee());
    this.store.dispatch(new LoadDataFamily());
    this.store.dispatch(new LoadDataGuarantor());
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.employeePhoto$ = this.store.pipe(select(getEmployeePhoto));
    // this.implementPolicy$ = this.store.pipe(select(implementPolicy));
    // this.policyAgreed$ = this.store.pipe(select(hasAgreedToPolicy));
    // this.showAgreement$ = this.store.pipe(select(showPolicyModal));
    // this.employeeConsent$ = this.store.pipe(select(getEmployeeConsent));
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
      case NavMenuItemTypes.CUSTOM_DATA_FORM: {
        this.setTableEditModeOnly();
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
    this.editButtonStatus = true;
    this.awaitingButtonStatus = true;
    this.deleteButtonStatus = true;
    this.refreshButton = true;
  }

  setTableMode() {
    this.addButtonStatus = true;
    this.editButtonStatus = false;
    this.awaitingButtonStatus = false;
    this.deleteButtonStatus = false;
    this.refreshButton = true;
  }

  setAllButtonsMode() {
    this.addButtonStatus = true;
    this.editButtonStatus = true;
    this.awaitingButtonStatus = true;
    this.deleteButtonStatus = true;
    this.refreshButton = true;
  }
  setTableEditModeOnly() {
    this.addButtonStatus = false;
    this.editButtonStatus = false;
    this.awaitingButtonStatus = false;
    this.deleteButtonStatus = false;
    this.refreshButton = true;
  }

  onButtonClicked($event) {
    // if ($event === 'ENABLE_EDIT') {
    //   this.showAgreement = true;
    // }
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
      case NavMenuItemTypes.CUSTOM_DATA_FORM: {
        this.customDataFormService.commandProcessor($event);
        break;
      }
      default:
        break;
    }
  }

  agreeButtonClicked() {
    this.comprehensiveData$.pipe(take(1)).subscribe(data => {
      this.showAgreement = false
      // this.store.dispatch(new LoadEmployeeConsent({ isAdmin: false, employeeId: data.employee_id }));
    })
  }

  disagreeButtonClicked() {
    this.showAgreement = false
    // this.store.dispatch(new HasAgreedToPolicy(false));
  }

  ngOnDestroy() {
    this.store.dispatch(new ClearApprovedDataMapEducation());
  }
}
