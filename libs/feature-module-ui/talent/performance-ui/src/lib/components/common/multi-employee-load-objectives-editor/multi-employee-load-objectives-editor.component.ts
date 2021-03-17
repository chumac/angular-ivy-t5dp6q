import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { MultiEmployeeLoadObjectivesEditorService } from './multi-employee-load-objectives-editor.service';
import { IPerformanceState, ProcessingLoadObjectives, isProcessingLoadObjectives, SaveLoadObjectives, ProcessingManageObjectives, SaveManageObjectives } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveDto, IObjectiveMasterDto } from '@nutela/models/talent/performance';
import * as constants from '../../../constants/common';
import { ProcessingMultiEmployeeLoadObjectives, SaveMultiEmployeeLoadObjectives, isProcessingMultiEmployeeLoadObjectives } from '../../../store/planning';

@Component({
  selector: 'x365-fm-talent-multi-employee-load-objectives-editor',
  templateUrl: './multi-employee-load-objectives-editor.component.html',
  styleUrls: ['./multi-employee-load-objectives-editor.component.scss'],
  providers: [MultiEmployeeLoadObjectivesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class MultiEmployeeLoadObjectivesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public filename: string;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  targetTypeOptions = constants.targetTypeOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: MultiEmployeeLoadObjectivesEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingMultiEmployeeLoadObjectives));
  }

  inEditMode(){}

  onCancel() {
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingMultiEmployeeLoadObjectives());
      this.store.dispatch(new SaveMultiEmployeeLoadObjectives({objectiveData: <IObjectiveDto>this.fs.value}));

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
