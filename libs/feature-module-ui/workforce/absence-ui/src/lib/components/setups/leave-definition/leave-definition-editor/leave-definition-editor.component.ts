import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { ILeaveDefinition } from '@nutela/models/workforce/leave';
import { Observable } from 'rxjs';
import { DefinitionEditorService } from './leave-definition-editor.service';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAbsenceState } from '../../../../store/root';
import { isProcessingLeaveDefinition, ProcessingLeaveDefinition, SaveLeaveDefinition,
         NotProcessingLeaveDefinition, UpdateLeaveDefinition, LoadingLeaveDefinition, NotLoadingLeaveDefinition, isLoadingLeaveDefinition } from '../../../../store/setups';
import { ShowToast } from '@nutela/store/shared';
import { DefinitionService } from '../leave-definition.service';

@Component({
  selector: 'x365-fm-workforce-absence-leave-definition-editor',
  templateUrl: './leave-definition-editor.component.html',
  styleUrls: ['./leave-definition-editor.component.scss']
})
export class LeaveDefinitionEditorComponent extends BaseFormComponent implements OnInit {

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: ILeaveDefinition;

  @Output() cancelClick = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;


  constructor(
    public fs: DefinitionEditorService,
    public definitionService:DefinitionService,
    public utilService: UtilService,
    private store: Store<IAbsenceState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingLeaveDefinition));
      this.isLoading$= this.store.pipe(select(isLoadingLeaveDefinition));

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
        const leave_id = this.data? this.data.leave_id: null;
        this.store.dispatch(new ProcessingLeaveDefinition());
        if(this.inEditMode()===false){
          this.store.dispatch(new SaveLeaveDefinition({data: this.fs.value, recordId: leave_id}));
        }
        else if(this.inEditMode()===true){
          this.store.dispatch(new UpdateLeaveDefinition({data: this.fs.value, recordId: leave_id}));
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
      this.store.dispatch(new NotProcessingLeaveDefinition());
      this.data = null;
      this.reset();
      this.cancelClick.emit();
    }

    reset() {
      this.fs.f.reset();
      this.fs.init(this.data);
    }

    onclick($event){
      console.log($event.target.checked);
    }

    onCanBreakClick($event){
      if($event.target.checked===true){
        this.store.dispatch(new LoadingLeaveDefinition())
      }
      else{
        this.store.dispatch(new NotLoadingLeaveDefinition())
      }
    }
}

