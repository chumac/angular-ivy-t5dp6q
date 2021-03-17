import { Component, OnInit, OnDestroy, Input, Output, SimpleChanges, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { IWorkDetails} from '@nutela/models/foundation';
import { ISelectOptionData } from '@nutela/models/common';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import {AddStepService } from './addstep.service';
import { IHRFoundationState } from '../../../store/root';
import { isProcessingWorkDefinition, getPositionData, getIndividualData, getRoleData } from '../../../store/workflow-definition/work-definition.selectors';
import { ProcessingWorkDefinition, NotProcessingWorkDefinition, SaveWorkDefinitionStep, LoadPosition, LoadIndividual, LoadRole } from '../../../store/workflow-definition';
import { ShowToast } from '@nutela/store/shared';
import * as constants from '@nutela/shared/app-global';
import { ProcessingWorkDetails, SaveWorkDetails, getProcessingRule, LoadProcessingRule, isProcessingWorkDetails } from '../../../store/workflow-details';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-plf-hrf-addstep',
  templateUrl: './addstep.component.html',
  styleUrls: ['./addstep.component.scss']
})
export class AddstepComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public id:number;
  @Input() public formType: string;
  @Input() public data: IWorkDetails;

  @ViewChild('escalate') escalate: ElementRef;


  @Input() public selectOptionData: ISelectOptionData;

  @Output() cancelClick = new EventEmitter<any>();

  positionData$: Observable<ISelectOption[]>;
  individualData$: Observable<ISelectOption[]>;
  roleData$: Observable<ISelectOption[]>;
  processingRule$: Observable<ISelectOption[]>;
  isProcessing$: Observable<boolean>;
  isProcessingDetails$: Observable<boolean>;

  specific_individual:boolean=false;
  specific_position:boolean=false;
  send_to_role:boolean=false;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  constructor(
    public fs: AddStepService ,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeDispatches() {
      this.store.dispatch(new LoadPosition());
      this.store.dispatch(new LoadIndividual());
      this.store.dispatch(new LoadRole());
      this.store.dispatch(new LoadProcessingRule());
     }

   storeSelects() {
      this.positionData$= this.store.pipe(select(getPositionData));
      this.individualData$=this.store.pipe(select(getIndividualData));
      this.processingRule$=this.store.pipe(select(getProcessingRule));
      this.roleData$=this.store.pipe(select(getRoleData));
      this.isProcessing$ = this.store.pipe(select(isProcessingWorkDefinition));
      this.isProcessingDetails$ = this.store.pipe(select(isProcessingWorkDetails));
    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onclick($event){
      console.log($event.target.checked);
    }

    onChange(): boolean{
      let status = false;
      if(this.escalate.nativeElement.checked === true){
        status = true;
      }
      return status;
    }


    onSubmit() {

      if (this.fs.valid) {
      if(!this.data){
        this.fs.WflowId.setValue(this.id);
        if(this.fs.CanEscalate.value===false){
          this.fs.Escalatehour.setValue(0);
        }
        this.store.dispatch(new ProcessingWorkDefinition());
        this.store.dispatch(new SaveWorkDefinitionStep({data: this.fs.value,wflowId:this.id}));
      }
      else if(this.data){
        console.log('form value', this.fs.value);
        console.log('main data', this.data)
        const workID=this.data?this.data.wflow_id:0;
       this.fs.WflowId.setValue(workID);
        const recordId = this.data? this.data.id: 0;
        console.log('recordid', recordId);
        //this.store.dispatch(new ProcessingWorkDetails());
        this.store.dispatch(new ProcessingWorkDetails());
       this.store.dispatch(new SaveWorkDetails({data: this.fs.value, recordId, workID:workID}));
      }
    }
    else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
     }

  }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingWorkDefinition());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
     // this.fs.f.reset();
     this.fs.form=this.fs.buildForm();
      this.fs.init(this.data);
    }

    Rule($event){
      console.log($event);
      if($event.value===2){
        this.specific_individual=true;
        this.specific_position=false;
        this.send_to_role=false;
      }
      else if($event.value===3){
        this.specific_position=true;
        this.send_to_role=false;
        this.specific_individual=false;
      }
      else if($event.value===4){
        this.send_to_role=true;
        this.specific_individual=false;
        this.specific_position=false;
      }
      else if($event.value===0 || $event.value===1){
        this.send_to_role=false;
        this.specific_individual=false;
        this.specific_position=false;
      }
    }


  ngOnDestroy(): void {

  }
  group =constants.addstep;

}
