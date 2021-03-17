import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum HrzCommandTypes {
  ADD = 'ADD',
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  DELETE = 'DELETE',
  REFRESH = 'REFRESH',
  APPLY = 'APPLY',
  RESCHEDULE = 'RESCHEDULE',
  RETURN = 'RETURN',
  RECALL = 'RECALL',
  CANCEL = 'CANCEL',
  SUBMIT = 'SUBMIT',
  START = 'START',
  CONTINUE = 'CONTINUE',
  RETRIEVE = 'RETRIEVE',
  APPROVE = 'APPROVE',
  DECLINE = 'DECLINE',
  ENABLE_EDIT = 'ENABLE_EDIT',
  PARTICIPANT_WITH_CRITERIA = 'PARTICIPANT_WITH_CRITERIA',
  BACK = 'BACK',
}

@Component({
  selector: 'x365-shared-ui-hrz-command-bar',
  templateUrl: './hrz-command-bar.component.html',
  styleUrls: ['./hrz-command-bar.component.scss']
})
export class HrzCommandBarComponent implements OnInit {
  @Input() public showAddButton: boolean = false;
  @Input() public showEditButton: boolean = false;
  @Input() public showAwaitingButton: boolean = false;
  @Input() public showDeleteButton: boolean = false;
  @Input() public showRefreshButton: boolean = false;
  @Input() public showEnableEditButton: boolean = false;
  @Input() public showAddParticipantCriteria: boolean = false;

  @Input() public showStartButton: boolean = false;
  @Input() public showRetrieveButton: boolean = false;
  @Input() public showApproveButton: boolean = false;
  @Input() public showDeclineButton: boolean = false;
  @Input() public showContinueButton: boolean = false;

  @Input() public showApplyButton: boolean = false;
  @Input() public showRescheduleButton: boolean = false;
  @Input() public showReturnButton: boolean = false;
  @Input() public showRecallButton: boolean = false;
  @Input() public showCancelButton: boolean = false;
  @Input() public showSubmitButton: boolean = false;

  @Input() public isProcessingSubmit: boolean = false;
  @Input() public isProcessingStart: boolean = false;
  @Input() public isProcessingApprove: boolean = false;
  @Input() public isProcessingDecline: boolean = false;
  @Input() public isProcessingRetrieve: boolean = false;
  @Input() public isProcessingCancel: boolean = false;

  @Input() public disableCancelButton: boolean = false;
  @Input() public disableAdd: boolean = false;
  @Input() public disableEdit: boolean = false;

  @Input() public isRounded: boolean = true;
  @Input() public showBack: boolean = false;

  @Input() public submitText: string = 'Submit';
  @Input() public startText: string = 'Start';
  @Input() public continueText: string = 'Continue';
  @Input() public retrieveText: string = 'Retrieve';
  @Input() public approveText: string = 'Approve';
  @Input() public declineText: string = 'Decline';
  @Input() public viewAwaitingText: string = 'View Awaiting Approval';

  @Output() buttonClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {  }

  addButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.ADD);
  }

  editButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.EDIT);
  }

  viewButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.VIEW);
  }

  deleteButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.DELETE);
  }

  submitButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.SUBMIT);
  }

  refreshButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.REFRESH);
  }

  applyButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.APPLY);
  }

  rescheduleButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.RESCHEDULE);
  }

  returnButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.RETURN);
  }

  recallButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.RECALL);
  }

  cancelButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.CANCEL);
  }

  startButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.START);
  }

  continueButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.CONTINUE);
  }

  retrieveButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.RETRIEVE);
  }

  approveButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.APPROVE);
  }

  declineButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.DECLINE);
  }

  enableEditButtonClicked() {
    this.buttonClicked.emit(HrzCommandTypes.ENABLE_EDIT);
  }

  eventParticipantWithCriteriaClicked() {
    this.buttonClicked.emit(HrzCommandTypes.PARTICIPANT_WITH_CRITERIA);
  }

  backBtnClicked() {
    this.buttonClicked.emit(HrzCommandTypes.BACK);
  }



}
