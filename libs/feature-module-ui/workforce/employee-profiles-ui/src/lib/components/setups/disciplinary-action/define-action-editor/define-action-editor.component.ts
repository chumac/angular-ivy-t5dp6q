
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IEmployeePaygradeInfo, IDisciplinaryActionDefinition } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, FilePickerComponent } from '@nutela/shared/ui';
import DataSource from 'devextreme/data/data_source';
import { DxLookupComponent } from 'devextreme-angular';
import { DefineActionEditorService } from './define-action-editor.service';
import { IEmployeesProfileState } from '../../../../store';
import { ProcessingDisciplinaryActionSetup, SaveDisciplinaryActionSetup, UpdateDisciplinaryActionSetup, isProcessingDisciplinaryActionSetup } from '../../../../store/setups/disciplinary-action';


@Component({
  selector: 'x365-fm-workforce-define-action-editor',
  templateUrl: './define-action-editor.component.html',
  styleUrls: ['./define-action-editor.component.scss'],
  providers: [DefineActionEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineActionEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;
  isProcessDifferential: boolean = false;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public activePersonnel: ISelectOption[];
  @Input() public paygradeSelectOption: ISelectOption[];
  @Input() public paygroupSelectOption: ISelectOption[];
  @Input() public currentPaygradeSelectOption: ISelectOption[];
  @Input() public currentPaygroupSelectOption: ISelectOption[];
  @Input() public arrearsStatusSelectOption: ISelectOption[];
  @Input() public data: IDisciplinaryActionDefinition;

  @Output() cancelClick = new EventEmitter<any>();

  @ViewChild('employeeId') employeeId: DxLookupComponent;

  payGroupSelectOption$: Observable<ISelectOption[]>;
  employeeCurrentGradeAndPaygroup$: Observable<IEmployeePaygradeInfo>;

  ngOnChanges(changes: SimpleChanges): void {

  if(changes['activePersonnel']) {
    this.activePersonnelDataSource = new DataSource({
      paginate: true,
      pageSize: 50,
      store: this.activePersonnel
    });
  }
    if(this.show===false){
      this.fs.initField()
    } else {
      if(this.data && this.data.auto_expires) {
        this.fs.showInput = false;
      }
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;

  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: DefineActionEditorService,
    public utilService: UtilService,
    private store: Store<IEmployeesProfileState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingDisciplinaryActionSetup));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  // getRowData$(rowId: number): Observable<IComprehensiveData> {
  //   return of(this.activePersonnel).pipe(
  //     map(d => d.filter(v => v.loandetail_id === rowId)),
  //     map(e => e.shift()))
  // }

  onAutoExpireChecked(event) {
    this.fs.showInput = !event.target.checked;
  }

  onSubmit() {
    if (this.fs.valid) {
      const recordId = this.data? this.data.daction_type_id: 0;

      if(this.fs.autoExpire.value) {
        this.fs.expiresInXMonth.setValue(null);
      }

      this.store.dispatch(new ProcessingDisciplinaryActionSetup());
      if(this.inEditMode()) {
        this.store.dispatch(new UpdateDisciplinaryActionSetup({data: this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
      } else {
        this.store.dispatch(new SaveDisciplinaryActionSetup({ data: this.fs.value }));
      }

    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    // this.store.dispatch(new NotProcessingPromotion());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.fs.initField()
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
