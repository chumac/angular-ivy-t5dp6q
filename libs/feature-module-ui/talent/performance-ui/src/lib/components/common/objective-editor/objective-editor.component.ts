import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ObjectiveEditorService } from './objective-editor.service';
import { IPerformanceState, ProcessingLoadObjectives, isProcessingLoadObjectives, SaveLoadObjectives, ProcessingManageObjectives, SaveManageObjectives } from '../../../store';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IObjectiveDto, IObjectiveMasterDto } from '@nutela/models/talent/performance';
import * as constants from '../../../constants/common';

@Component({
  selector: 'x365-fm-talent-objective-editor',
  templateUrl: './objective-editor.component.html',
  styleUrls: ['./objective-editor.component.scss'],
  providers: [ObjectiveEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ObjectiveEditorComponent  extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  targetTypeOptions = constants.targetTypeOptions;

  constructor(public utilService: UtilService, public fs: ObjectiveEditorService, private store: Store<IPerformanceState>) { 
    super();
  }


  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingLoadObjectives));
  }

  inEditMode(){}

  onCancel() {
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingLoadObjectives());
      this.store.dispatch(new SaveLoadObjectives({objectiveData: <IObjectiveDto>this.fs.value}));

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
