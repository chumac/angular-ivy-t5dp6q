import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavMenuItemTypes } from '../../../main/hr-enumerations';
import { Router, ActivatedRoute } from '@angular/router';
import { IEmployeesProfileState } from '../../../store';
import { Store, select } from '@ngrx/store';
import {
  LoadComprehensiveData,
  getComprehensiveData,
  getEmployeeName,
  getEmployeePhoto,
  LoadEmployeePhoto,
  ResetImageData,
  ResetComprehensiveData,
  ResetGeneralData,
  ResetContactData,
  ResetIdentificationData,
  ResetTrainingHistoryData,
  ResetCompetencyProfileData,
  ResetPromotionHistoryData,
  ResetTransferHistoryData,
  ResetVacationHistoryData,
  ResetPerformanceHistoryData,
  ResetDisciplinaryActionData,
  ResetPayrollPaymentHistoryData,
  ResetLoanHistoryData,
  ResetWorkflowTransactionData,
  ResetTeamData,
  ResetSeparationData,
  ResetConfirmationInformationData,
  LoadEmployeeFilePhoto
} from '../../../store/employee-detailed-area';
import { Observable } from 'rxjs';
import { IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { IName } from '@nutela/models/core-data';
import { ProfilePictureService, GeneralInformationService, ContactService, IdentificationService, PaymentService, WorkHistoryService, EducationalHistoryService, ProfessionalQualificationService, DependantService, BeneficiaryService, PersonalRefereeService, FamilyService, GuarantorService, HrCustomDataFormService } from './services';
import { STANDARD_ROUTES, BUSINESS_OPTION } from '@nutela/shared/app-global';
import { take } from 'rxjs/operators';
import { LoadAgreementTemplate, showPolicyModal, getEmployeeConsent, LoadEmployeeConsent } from 'libs/store/shared/src/lib/policy-agreement';
import { implementPolicyHR } from '@nutela/store/modules/foundation';
import { hasAgreedToPolicy, HasAgreedToPolicy } from '@nutela/store/modules/workforce/employee-profiles';



@Component({
  selector: 'x365-fm-workforce-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss']
})
export class DetailedInfoComponent implements OnInit {

  selectedModuleId = NavMenuItemTypes.GENERAL_INFORMATION;

  employeeId: number;

  addButtonStatus = false;
  editButtonStatus = false;
  awaitingButtonStatus = false;
  deleteButtonStatus = false;
  refreshButton = true;
  showAgreement: boolean = false;
  showEnableEditButtonStatus = false;

  comprehensiveData$: Observable<IComprehensiveData>;
  employeeName$: Observable<IName>;
  employeePhoto$: Observable<any>;
  implementPolicyHR$: Observable<string>;
  agreementText$: Observable<string>;
  policyAgreed$: Observable<boolean>;
  showAgreement$: Observable<boolean>;
  employeeConsent$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IEmployeesProfileState>,
    private router: Router,
    private profilePictureService: ProfilePictureService,
    private generalInformationService: GeneralInformationService,
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
    private hrCustomDataFormService: HrCustomDataFormService,
    // private bneficiaryService: BeneficiaryService,
    ) {
    this.employeeId = this.route.snapshot.params.employeeId;
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadAgreementTemplate({ key: BUSINESS_OPTION.implementPolicy }));

    this.store.dispatch(new LoadComprehensiveData({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadEmployeePhoto({ employeeId: this.employeeId }));
    this.store.dispatch(new LoadEmployeeFilePhoto({ employeeId: this.employeeId }));
  }

  storeSelects() {
    this.comprehensiveData$ = this.store.pipe(select(getComprehensiveData));
    this.employeeName$ = this.store.pipe(select(getEmployeeName));
    this.employeePhoto$ = this.store.pipe(select(getEmployeePhoto));
    this.implementPolicyHR$ = this.store.pipe(select(implementPolicyHR));
    this.policyAgreed$ = this.store.pipe(select(hasAgreedToPolicy));
    this.employeeConsent$ = this.store.pipe(select(getEmployeeConsent));
  }

  agreeButtonClicked() {
    this.comprehensiveData$.pipe(take(1)).subscribe(data => {
      // this.showAgreement = false
      // this.store.dispatch(new LoadEmployeeConsent({isAdmin: true, employeeId: data.employee_id }));
    })
  }

  disagreeButtonClicked() {
    this.showAgreement = false
    this.store.dispatch(new HasAgreedToPolicy(false));
  }

  onNavMenuItemSelected($event) {
    this.selectedModuleId = $event;

    switch ($event) {
      case NavMenuItemTypes.GENERAL_INFORMATION:
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
      case NavMenuItemTypes.HR_CUSTOM_DATA_FORMS:
      case NavMenuItemTypes.TRAINING_HISTORY:
      case NavMenuItemTypes.COMPETENCY_PROFILE:
      case NavMenuItemTypes.PROMOTION_HISTORY:
      case NavMenuItemTypes.TRANSFER_HISTORY:
      case NavMenuItemTypes.VACATION_HISTORY:
      case NavMenuItemTypes.PERFORMANCE_HISTORY:
      case NavMenuItemTypes.DISCIPLINARY_ACTIONS:
      case NavMenuItemTypes.COMMENDATIONS:
      case NavMenuItemTypes.PERSONALITY_PROFILE:
      case NavMenuItemTypes.CONFIRMATION_INFORMATION:
      case NavMenuItemTypes.PAYROLL_PAYMENT_HISTORY:
      case NavMenuItemTypes.LOAN_HISTORY:
      case NavMenuItemTypes.WORKFLOW_TRANSACTIONS:
      case NavMenuItemTypes.TAX_INFORMATION:
      case NavMenuItemTypes.TEAM:
      case NavMenuItemTypes.CAREER_HISTORY:
      case NavMenuItemTypes.SUCCESSION_PROFILE:
      case NavMenuItemTypes.SEPARATION: {
        this.setViewOnlyMode();
        break;
      }
      default: {
        this.setAllButtonsMode();
        break;
      }
    }
  }


  setFormMode() {
    this.implementPolicyHR$.pipe(take(1)).subscribe(val => {
      this.employeeConsent$.pipe(take(1)).subscribe(res => {
        if (val.toLowerCase() === 'yes' && !res) {
          this.showEnableEditButtonStatus = true;
        } else {
          this.addButtonStatus = false;
          this.showEnableEditButtonStatus = false;
          this.editButtonStatus = true;
          this.awaitingButtonStatus = true;
          this.deleteButtonStatus = true;
          this.refreshButton = true;
        }
      })
    })
  }

  setTableMode() {
    this.implementPolicyHR$.pipe(take(1)).subscribe(val => {
      this.employeeConsent$.pipe(take(1)).subscribe(res => {
        if (val.trim().toLowerCase() === 'yes' && !res) {
          this.showEnableEditButtonStatus = true;
        } else {
          this.addButtonStatus = true;
          this.refreshButton = true;
          this.editButtonStatus = false;
          this.awaitingButtonStatus = false;
          this.deleteButtonStatus = false;
          this.showEnableEditButtonStatus = false;
        }
      })
    })
  }

  setAllButtonsMode() {
    this.implementPolicyHR$.pipe(take(1)).subscribe(val => {
      this.employeeConsent$.pipe(take(1)).subscribe(res => {
        if (val.trim().toLowerCase() === 'yes' && !res) {
          this.showEnableEditButtonStatus = true;
        } else {
          this.addButtonStatus = true;
          this.editButtonStatus = true;
          this.awaitingButtonStatus = true;
          this.deleteButtonStatus = true;
          this.refreshButton = true;
          this.showEnableEditButtonStatus = false;
        }
      })

    })
  }

  setViewOnlyMode() {
    this.addButtonStatus = false;
    this.editButtonStatus = false;
    this.awaitingButtonStatus = false;
    this.deleteButtonStatus = false;
    this.refreshButton = true;
  }

  onButtonClicked($event, employeeId = this.employeeId) {
    if ($event === 'ENABLE_EDIT') {
      this.showAgreement = true;
    } else {
      switch (this.selectedModuleId) {
        case NavMenuItemTypes.GENERAL_INFORMATION: {
          this.generalInformationService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.PROFILE_PICTURE: {
          this.profilePictureService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.CONTACT: {
          this.contactService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.IDENTIFICATION: {
          this.identificationService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.PAYMENT: {
          this.paymentService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.WORK_HISTORY: {
          this.workHistoryService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.EDUCATIONAL_HISTORY: {
          this.educationalHistoryService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.PROFESSIONAL_QUALIFICATIONS: {
          this.professionalQualificationService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.DEPENDANTS: {
          this.dependantService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.BENEFICIARIES: {
          this.beneficiaryService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.PERSONAL_REFEREES: {
          this.personalRefereeService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.FAMILY: {
          this.familyService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.GUARANTORS: {
          this.guarantorService.commandProcessor($event, employeeId);
          break;
        }
        case NavMenuItemTypes.HR_CUSTOM_DATA_FORMS: {
          this.hrCustomDataFormService.commandProcessor($event, employeeId);
          break;
        }
        default:
          break;
      }
    }
  }

  backButtonClicked() {
    this.router.navigate([STANDARD_ROUTES.hrEmployees]);
    this.resetStore();
  }

  resetStore() {
    this.store.dispatch(new ResetImageData());
    this.store.dispatch(new ResetComprehensiveData());
    this.store.dispatch(new ResetGeneralData());
    this.store.dispatch(new ResetContactData());
    this.store.dispatch(new ResetIdentificationData());

    this.store.dispatch(new ResetTrainingHistoryData());
    this.store.dispatch(new ResetCompetencyProfileData());
    this.store.dispatch(new ResetPromotionHistoryData());
    this.store.dispatch(new ResetTransferHistoryData());
    this.store.dispatch(new ResetVacationHistoryData());
    this.store.dispatch(new ResetPerformanceHistoryData());
    this.store.dispatch(new ResetDisciplinaryActionData());
    this.store.dispatch(new ResetConfirmationInformationData());
    this.store.dispatch(new ResetPayrollPaymentHistoryData());
    this.store.dispatch(new ResetLoanHistoryData());
    this.store.dispatch(new ResetWorkflowTransactionData());
    this.store.dispatch(new ResetTeamData());
    this.store.dispatch(new ResetSeparationData());
  }
}
