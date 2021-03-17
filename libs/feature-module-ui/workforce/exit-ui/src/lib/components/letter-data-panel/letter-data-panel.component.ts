import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ResignationViewerComponent } from '../resignation-viewer/resignation-viewer.component';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { MatDialog, MatDialogRef } from '@angular/material';
import { IResignationLetter } from '../../interfaces';
import { IComprehensiveData, IPersonal } from '@nutela/models/workforce/employee-profiles';
import { IName } from '@nutela/models/core-data';
import { UtilService } from '@nutela/core-services';
import { LetterStatus } from '../../enumerations/letter-status.enumeration';
import { LoadResignationReportUrl } from '../../store/hr-resignation';
import { Store } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';

@Component({
  selector: 'x365-fm-workforce-exit-letter-data-panel',
  templateUrl: './letter-data-panel.component.html',
  styleUrls: ['./letter-data-panel.component.scss']
})
export class LetterDataPanelComponent implements OnInit, OnDestroy {

  @Input() letter: IResignationLetter;
  @Input() comprehensiveData: IComprehensiveData;
  @Input() activePersonnel: IPersonal;
  @Input() dataDoc: any;
  @Input() employeePhoto: any;
  @Input() isLM: boolean = false;
  @Input() isHR: boolean = false;
  @Input() reportButtonBackward: boolean = false;
  @Input() allowViewLetter = false;

  resignationDialogRef: MatDialogRef<ResignationViewerComponent>;

  constructor(public dialog: MatDialog, public utilService: UtilService, private store: Store<IAppState>,) {

  }

  ngOnInit() { }

  viewResignationLetter() {
    if (this.letter) {
      this.openModal(this.letter);
    } else {
      new ShowToast({
        title: null,
        message: `Resignation Letter not available yet.`,
        type: ToastTypes.INFO
      });
    }
  }

  openModal(result: IResignationLetter): void {
    this.resignationDialogRef = this.dialog.open(ResignationViewerComponent, {
      width: '50%',
      minHeight: '729px',
      data: result,
      panelClass: 'custom-dialog-container'
    });
  }

  onRefresh() {
    // this.store.dispatch(new LoadLetterResign());
    new ShowToast({
      title: null,
      message: `Data is being refreshed.`,
      type: ToastTypes.INFO
    });
  }

  get fullname(): IName {
    if (this.comprehensiveData) {
      return this.utilService.getEmployeeFullName(this.comprehensiveData.title, this.comprehensiveData.employee_firstname, this.comprehensiveData.employee_surname, this.comprehensiveData.employee_midname);
    } else {
      return { employeeId: 0 };
    }
  }

  get phoneNumber(): string {
    const data = this.comprehensiveData;

    if (data) {
      if (this.comprehensiveData.phone != null || this.comprehensiveData.phone === '') {
        return this.comprehensiveData.phone;
      }

      if (this.comprehensiveData.mobile_phone != null || this.comprehensiveData.mobile_phone === '') {
        return this.comprehensiveData.mobile_phone;
      }

      if (this.comprehensiveData.gsm != null || this.comprehensiveData.gsm === '') {
        return this.comprehensiveData.gsm;
      }
    }

    return '';
  }
  get kudos(): string {
    if (this.comprehensiveData.store_kudos > 0) {
      return this.comprehensiveData.store_kudos.toString();
    } else {
      return 'None';
    }
  }


  getClass(status: number): string {
    if (this.letter) {
      switch (status) {
        case LetterStatus.INITIATED:
          return 'badge-primary'
        case LetterStatus.AWAITING_APPROVAL:
        case LetterStatus.EXIT_INTERVIEW:
          return 'badge-warning'
        case LetterStatus.CLEARANCE_PROCESS:
        case LetterStatus.REGISTER_ON_ALUMNI:
          return 'badge-info'
        case LetterStatus.EXIT_INTERVIEW_COMPLETE:
        case LetterStatus.CLEARANCE_PROCESS_COMPLETE:
        case LetterStatus.PROCESS_COMPLETE:
          return 'badge-success'
        case LetterStatus.PROCESS_CANCELLED:
          return 'badge-danger'
      }
    } else {
      return ''
    }
  }

  onViewReportClicked() {
    this.store.dispatch(new LoadResignationReportUrl({resignationId: this.letter.id}));
  }

  ngOnDestroy() {
    this.letter = null;
    this.comprehensiveData = null;
  }
}
