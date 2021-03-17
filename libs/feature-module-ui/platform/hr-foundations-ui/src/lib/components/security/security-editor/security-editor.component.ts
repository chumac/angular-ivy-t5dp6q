import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IHRFoundationState } from '../../../store';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ISecurity } from '@nutela/models/foundation';
import { Observable } from 'rxjs';
import { SecurityService } from './security-editor.service';
import { isProcessingSecurity, ProcessingSecurity, NotProcessingSecurity, SaveSecurity, getIndividualData, getRoleData, LoadIndividual, LoadRole, getSingleAction, LoadSingleAction } from '../../../store/security';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import * as constants from '@nutela/shared/app-global';
import { ISelectOption } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-plf-hrf-security-editor',
  templateUrl: './security-editor.component.html',
  styleUrls: ['./security-editor.component.scss']
})
export class SecurityEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ISecurity;
  @Output() cancelClick = new EventEmitter<any>();

  individualData$: Observable<ISelectOption[]>;
  roleData$: Observable<ISelectOption[]>;
  singleAction$: Observable<ISelectOption[]>;
  individualData=[];
  single=[];


  role_new:boolean;
  delete_role:boolean;
  showUser:boolean;
  showBoth:boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
      this.role_new=false;
      this.delete_role=false;
      this.showUser=false;
      this.showBoth=false;
    }
  }

  isProcessing$: Observable<boolean>;


  constructor(
    public fs: SecurityService,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
  }

    ngOnInit() {
      this.storeSelects();
      this.storeDispatches();
    }

    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingSecurity));
      this.individualData$=this.store.pipe(select(getIndividualData));
      this.roleData$=this.store.pipe(select(getRoleData));
      this.singleAction$=this.store.pipe(select(getSingleAction));
    }

    storeDispatches() {
      this.store.dispatch(new LoadIndividual());
      this.store.dispatch(new LoadRole());
      this.store.dispatch(new LoadSingleAction());
     }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if (this.fs.valid) {
        this.fs.formatDate();
        this.store.dispatch(new ProcessingSecurity());
        this.store.dispatch(new SaveSecurity({data: this.fs.value}));
      }
      else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingSecurity());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    Rule($event){
      if($event.value===0){
        this.role_new=true;
        this.delete_role=false;
        this.showUser=false;
        this.showBoth=false;
      }
      else if($event.value===1){
        this.role_new=false;
        this.delete_role=true;
        this.showUser=false;
        this.showBoth=false;
      }
      else if($event.value ===2 || $event.value===3){
        this.role_new=false;
        this.delete_role=false;
        this.showUser=true;
        this.showBoth=false;
      }
      else if($event.value ===4 || $event.value===5){
        this.role_new=false;
        this.delete_role=false;
        this.showUser=false;
        this.showBoth=true;
      }
      else{
        this.role_new=false;
        this.delete_role=false;
        this.showUser=false;
        this.showBoth=false;
      }

    }
}
