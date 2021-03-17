import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../../../../store/root';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsError, UtilService } from '@nutela/core-services';
import { TimesheetProjectEditorService } from './timesheet-project-editor.service';
import { ITimeSheetProject } from '@nutela/models/workforce/time-sheet';
import { isProcessingTimeSheetProject, ProcessingTimeSheetProject, SaveTimeSheetProject, AddTimeSheetProject } from '../../../../store/time-sheet-project';
import { getCostCenters, LoadCostCenters } from '@nutela/store/modules/foundation';
import { ISelectOption } from '@nutela/models/core-data';
import { IStructureTree } from '@nutela/models/common';

@Component({
  selector: 'x365-fm-workforce-time-timesheet-project-editor',
  templateUrl: './timesheet-project-editor.component.html',
  styleUrls: ['./timesheet-project-editor.component.scss'],
  providers: [TimesheetProjectEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class TimesheetProjectEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ITimeSheetProject;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  costCenters$: Observable<ISelectOption[]>;
  showStructureTree: boolean = false;  

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: TimesheetProjectEditorService, private store: Store<IRootState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingTimeSheetProject));
    this.store.dispatch(new LoadCostCenters());
    this.costCenters$ = this.store.pipe(select(getCostCenters));
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
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingTimeSheetProject());
        this.store.dispatch(new SaveTimeSheetProject({data: <ITimeSheetProject>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingTimeSheetProject());
        this.store.dispatch(new AddTimeSheetProject({data: <ITimeSheetProject>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.form = this.fs.buildForm();
    this.fs.init(this.data);
  }

  toggleStructurTreeView() {
    this.showStructureTree = !this.showStructureTree
  }

  setStructure($evt: IStructureTree) {
    this.fs.stuctureId.patchValue($evt.structure_id);
  }

  ngOnDestroy() {
  }


}
