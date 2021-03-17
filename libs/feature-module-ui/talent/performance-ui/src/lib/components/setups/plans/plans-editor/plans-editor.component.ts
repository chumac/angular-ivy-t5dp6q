import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { PlansEditorService } from './plans-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IPlan } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingPlan, ProcessingPlan, SavePlan, AddPlan, getPlanData } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-plans-editor',
  templateUrl: './plans-editor.component.html',
  styleUrls: ['./plans-editor.component.scss'],
  providers: [PlansEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PlansEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPlan;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  planList$: Observable<IPlan[]>;

  

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: PlansEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingPlan));
    this.planList$ = this.store.pipe(select(getPlanData));

  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      if(!this.fs.usePrevObj.value){
        this.fs.prevPlanId.setValue(null);
       }
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingPlan());
        this.store.dispatch(new SavePlan({data: <IPlan>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingPlan());
        this.store.dispatch(new AddPlan({data: <IPlan>this.fs.value }));
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
    // this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
