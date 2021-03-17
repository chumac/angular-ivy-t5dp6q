import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PROCESS_FORM_ROLE, PROCESS_TRANSACTION_REDIRECT_URLs } from '../../../../constants';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable, Subscription } from 'rxjs';
import { IProcessFormDefinition, IProcessMetaData } from '@nutela/models/workforce/employee-profiles';
import { LoadDataCustomProcessLookup, getCustomProcessLookupData, isProcessingCustomProcessLookup, ProcessingCustomProcessLookup, getCustomProcessLookupMasterId, InitiatingCustomProcessLookup, isInitiatingCustomProcessLookup, InitiateProcessCustomProcessLookup, getCustomProcessLookupUserMetaData, getCustomProcessLookupTeamMembers, LoadTeamMembersCustomProcessLookup } from '../../../../store/processes/custom-process-lookup';
import { take } from 'rxjs/operators';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { DxLookupComponent } from 'devextreme-angular';
import { LoadMetaDataProcessFormWizardSuccess } from '../../../../store/processes/process-form-wizard';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';



@Component({
  selector: 'x365-shared-ui-custom-process-lookup',
  templateUrl: './custom-process-lookup.component.html',
  styleUrls: ['./custom-process-lookup.component.scss']
})
export class CustomProcessLookupComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  processList$: Observable<IProcessFormDefinition[]>;
  isProcessing$: Observable<boolean>;
  isInitiating$: Observable<boolean>;
  currentMasterId$: Observable<number>;
  userMetaData$: Observable<IProcessMetaData>;
  activePersonnel$: Observable<ISelectOption[]>;
  teamMembers$: Observable<ISelectOption[]>;
  @ViewChild('employeeLookup') employeeLookup: DxLookupComponent; 
  roles = PROCESS_FORM_ROLE;
  term: string;

  constructor(private location: Location, private store: Store<IAppState>, private router: Router, public sanitization: DomSanitizer) {}

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadTeamMembersCustomProcessLookup());
    this.store.dispatch(new ProcessingCustomProcessLookup());
    this.loadDataCustomProcessLookup();
  }

  storeSelects() {
    this.processList$ = this.store.pipe(select(getCustomProcessLookupData));
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomProcessLookup));
    this.isInitiating$ = this.store.pipe(select(isInitiatingCustomProcessLookup));
    this.currentMasterId$ = this.store.pipe(select(getCustomProcessLookupMasterId));
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.teamMembers$ = this.store.pipe(select(getCustomProcessLookupTeamMembers));
    this.userMetaData$ = this.store.pipe(select(getCustomProcessLookupUserMetaData));
  }

  loadDataCustomProcessLookup() {
    this.userMetaData$.pipe(take(1)).subscribe(res=>this.store.dispatch(new LoadDataCustomProcessLookup({ roleId: res.roleId})));
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.storeSelects();
  }

  
  onRunButtonClicked(id: number, roleId) {
    if(this.employeeLookup.value){
      this.store.dispatch(new InitiatingCustomProcessLookup());
      this.store.dispatch(new InitiateProcessCustomProcessLookup({processId: id, employeeId: this.employeeLookup.value}));
      this.subscriptions = this.currentMasterId$.subscribe((id) => {
        if(id){
          this.store.dispatch(new LoadMetaDataProcessFormWizardSuccess({roleId: roleId, employeeId: this.employeeLookup.value, masterId: id}));
          this.router.navigate([`${PROCESS_TRANSACTION_REDIRECT_URLs.processFormWizardUrl}`], { skipLocationChange: true });
        }
      });
    } else {
      this.store.dispatch(new ShowToast({title: 'Error', message: `Select an employee`, type: ToastTypes.ERROR}));
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

}
