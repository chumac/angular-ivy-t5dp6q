import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef, ViewChild} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { IEmployeesProfileState } from '../../../../store';
import { ITeamDeployment, IPersonal, IComprehensiveData } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption, IBasicData } from '@nutela/models/core-data';
import { TeamDeploymentEditorService } from './team-deployment-editor.service';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';
import { from } from 'rxjs/internal/observable/from';
import { isProcessingTeamDeployment, ProcessingTeamDeployment, SaveTeamDeployment, LoadPositionListTeamDeployment, getPositionListTeamDeployment, getTeamMembersTeamDeployment, LoadTeamMembersTeamDeployment, DeloySelfTeamDeployment, DeployTeamMemberTeamDeployment, loadingSuggestionTeamDeployment, getSuggestedSupervisorTeamDeployment, LoadSuggestedSupervisorTeamDeployment, LoadingSuggestionTeamDeployment } from '../../../../store/team-deployments';
import { getAnalysisDetail, getComprehensiveData } from '@nutela/store/modules/workforce/employee-profiles';
import { getCostCenters, LoadCostCenters, getActivePersonnel } from '@nutela/store/modules/foundation';
import { IStructureTree } from '@nutela/models/common';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IPosition } from '@nutela/models/workforce/personnel';
import { Validators } from '@angular/forms';


@Component({
  selector: 'x365-fm-workforce-team-deployment-editor',
  templateUrl: './team-deployment-editor.component.html',
  styleUrls: ['./team-deployment-editor.component.scss'],
  providers: [TeamDeploymentEditorService],
})
export class TeamDeploymentEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean = true;
  @Input() public width: number;
  @Input() public data: ITeamDeployment;
  @Input() public transactionType: IBasicData;
  @Input() public teamMember$: Observable<IPersonal[]>;
  @ViewChild('teamMemberLookup') teamMemberLookup: DxLookupComponent;
  @ViewChild('sourceCostCenterLookUp') sourceCostCenterLookUp: DxLookupComponent;
  @Output() cancelClick = new EventEmitter<any>();

  isProcessing$: Observable<boolean>;
  costCenters$: Observable<ISelectOption[]>;
  positionList$: Observable<IPosition[]>;
  teamList$: Observable<IPersonal[]>; 
  employeeList$: Observable<ISelectOption[]>; 
  loadingSuggestion$: Observable<boolean>;
  suggestedSupervisor$: Observable<number>;
  myCostCenter$: Observable<any>;
  myComprehensiveInfo$: Observable<IComprehensiveData>;
  showSourceStructureTree: boolean = false;
  showDestinationStructureTree: boolean = false;
  private subscription: Subscription = new Subscription();
  gridBoxValue: number[] = [];



  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(changes['show']) {
      if(this.show){  
        this.gridBoxValue = [];
      }
      if(this.show && !this.isTeamDeploy()){
        this.setEmployeeLookUp();
      }
    }
  }

  constructor(public fs: TeamDeploymentEditorService, public utilService: UtilService, private store: Store<IEmployeesProfileState>) {
    super();
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCostCenters());
    this.store.dispatch(new LoadPositionListTeamDeployment());
    this.store.dispatch(new LoadTeamMembersTeamDeployment());
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTeamDeployment));
    this.costCenters$ = this.store.pipe(select(getCostCenters));
    this.myCostCenter$ = this.store.pipe(select(getAnalysisDetail));
    this.myComprehensiveInfo$ = this.store.pipe(select(getComprehensiveData));
    this.positionList$ = this.store.pipe(select(getPositionListTeamDeployment));
    this.teamList$ = this.store.pipe(select(getTeamMembersTeamDeployment));
    this.employeeList$ = this.store.pipe(select(getActivePersonnel));
    this.loadingSuggestion$ = this.store.pipe(select(loadingSuggestionTeamDeployment));
    this.suggestedSupervisor$ = this.store.pipe(select(getSuggestedSupervisorTeamDeployment));
  }

  setEmployeeLookUp() {
    this.subscription.add(this.myComprehensiveInfo$.pipe(take(1)).subscribe((empData: IPersonal)=>{ 
      if(empData){
        this.fs.employeeId.patchValue(empData.employee_id);
      }
    }));
  }

  onEmployeeSelected() {
    this.subscription.add(this.myComprehensiveInfo$.pipe(take(1)).subscribe((empData: IPersonal)=>{ 
      if(empData){
        if (this.teamMemberLookup.value) {
          let items: IPersonal = this.teamMemberLookup.selectedItem;
          if((items.employee_id === empData.employee_id) && (this.isTeamDeploy())) {
            this.teamMemberLookup.instance.reset();
            this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: `You cannot select yourself`, options: toastOptionsError()}));
        } else { 
            this.fs.sourceStrTypeId.patchValue(items.location_id);
            this.fs.sourceStrDetailId.patchValue(items.location_detail_id);
            this.fs.currentPosId.patchValue(items.position_id);
          }
        } else {
         // this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: `Select an employee`, options: toastOptionsError()}));
        }
      }
    }));
  }
  
  toggleSourceStructurTreeView() {
    this.showSourceStructureTree = !this.showSourceStructureTree;
  }

  toggleDestinationStructurTreeView() {
    this.showDestinationStructureTree = !this.showDestinationStructureTree;
  }

  setSourceStructure($evt: IStructureTree) {
    this.fs.sourceStrTypeId.patchValue($evt.structure_type_id);
    this.fs.sourceStrDetailId.patchValue($evt.structure_id);
  }

  setDestinationStructure($evt: IStructureTree) {
    this.fs.destinationStrTypeId.patchValue($evt.structure_type_id);
    this.fs.destinationStrDetailId.patchValue($evt.structure_id);
  }

  onSuggestEmployeeButtonClicked(employeeId: number, positionArr: Array<number>, structureDetailId: number) {
    const positionId = (positionArr)?((positionArr.length>0)?positionArr[0]:null):null;
    if(!employeeId){
      this.store.dispatch(new ShowToast({title: null, message: 'Select Employee', options: toastOptionsError()}));
    } else if(!positionId) {
      this.store.dispatch(new ShowToast({title: null, message: 'Select New Position', options: toastOptionsError()}));
    } else if(!structureDetailId) {
      this.store.dispatch(new ShowToast({title: null, message: 'Select New Destination', options: toastOptionsError()}));
    } else {
      this.store.dispatch(new LoadingSuggestionTeamDeployment());
      this.store.dispatch(new LoadSuggestedSupervisorTeamDeployment({employeeId: employeeId, positionId: positionId, structureDetailId: structureDetailId}));  
    }
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  isTeamDeploy(): boolean {
    if (this.transactionType.id) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  onSubmit(){
    if(!this.fs.changeStructure.value){
      // this.fs.sourceStrTypeId.setValue(null);this.fs.sourceStrTypeId.clearValidators();this.fs.sourceStrTypeId.updateValueAndValidity();
      // this.fs.sourceStrDetailId.setValue(null);this.fs.sourceStrDetailId.clearValidators();this.fs.sourceStrDetailId.updateValueAndValidity();
      this.fs.destinationStrTypeId.setValue(null);this.fs.destinationStrTypeId.clearValidators();this.fs.destinationStrTypeId.updateValueAndValidity();
      this.fs.destinationStrDetailId.setValue(null);this.fs.destinationStrDetailId.clearValidators();this.fs.destinationStrDetailId.updateValueAndValidity();
    } else {
      // this.fs.sourceStrTypeId.setValidators([Validators.required]);this.fs.sourceStrTypeId.updateValueAndValidity();
      // this.fs.sourceStrDetailId.setValidators([Validators.required]);this.fs.sourceStrDetailId.updateValueAndValidity();
      // this.fs.destinationStrTypeId.setValidators([Validators.required]);this.fs.destinationStrTypeId.updateValueAndValidity();
      this.fs.destinationStrDetailId.setValidators([Validators.required]);this.fs.destinationStrDetailId.updateValueAndValidity();

    }
    if(!this.fs.changeRole.value){
      this.fs.currentPosId.setValue(null);this.fs.currentPosId.clearValidators();this.fs.currentPosId.updateValueAndValidity();
      this.fs.newPosId.setValue(null);this.fs.newPosId.clearValidators();this.fs.newPosId.updateValueAndValidity();
    } else {
      // this.fs.currentPosId.setValidators([Validators.required]);this.fs.currentPosId.updateValueAndValidity();
      this.fs.newPosId.setValidators([Validators.required]);this.fs.newPosId.updateValueAndValidity();
    }
    if(!this.fs.isTemporary.value){
      this.fs.revertDate.setValue(null);this.fs.revertDate.clearValidators();this.fs.revertDate.updateValueAndValidity();
    } else {
      this.fs.revertDate.setValidators([Validators.required]);this.fs.revertDate.updateValueAndValidity();
    }

    if(!this.fs.changeReportTo.value){
      this.fs.reportToId.setValue(null);this.fs.reportToId.clearValidators();this.fs.reportToId.updateValueAndValidity();
    } else {
      this.fs.reportToId.setValidators([Validators.required]);this.fs.reportToId.updateValueAndValidity();
    }

    if (this.fs.f.valid) {
      if(this.isTeamDeploy()){
        let val: ITeamDeployment = this.fs.value;
        val.n_position_id = (Array.isArray(this.fs.newPosId.value))?this.fs.newPosId.value.toString():null;
        // this.fs.newPosId.patchValue((Array.isArray(this.fs.newPosId.value))?this.fs.newPosId.value.toString():null);
        this.store.dispatch(new ProcessingTeamDeployment());
        this.store.dispatch(new DeloySelfTeamDeployment({data: <ITeamDeployment>val}));
        } else {
        let val: ITeamDeployment = this.fs.value;
        val.n_position_id = (Array.isArray(this.fs.newPosId.value))?this.fs.newPosId.value.toString():null;
        // this.fs.newPosId.patchValue((Array.isArray(this.fs.newPosId.value))?this.fs.newPosId.value.toString():null);
        this.store.dispatch(new ProcessingTeamDeployment());
        this.store.dispatch(new DeployTeamMemberTeamDeployment({data: <ITeamDeployment>val}));
      }
    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


