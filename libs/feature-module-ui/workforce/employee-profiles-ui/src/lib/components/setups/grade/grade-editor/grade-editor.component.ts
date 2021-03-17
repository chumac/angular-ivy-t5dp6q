
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IEmployeePaygradeInfo, IGradeManagement } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, FilePickerComponent } from '@nutela/shared/ui';
import DataSource from 'devextreme/data/data_source';
import { DxLookupComponent } from 'devextreme-angular';
import { GradeEditorService } from './grade-editor.service';
import { IEmployeesProfileState } from '../../../../store';
import { ProcessingGradeManagement, SaveGradeManagement, UpdateGradeManagement, isProcessingGradeManagement } from '../../../../store/setups/grade-management';


@Component({
  selector: 'x365-fm-workforce-grade-editor',
  templateUrl: './grade-editor.component.html',
  styleUrls: ['./grade-editor.component.scss'],
  providers: [GradeEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradeEditorComponent  extends BaseFormComponent
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
  @Input() public data: IGradeManagement;

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
    // if(this.show===false){
    //   this.fs.initField()
    // } else {
    //   if(this.data && this.data.auto_expires) {
    //     this.fs.showInput = false;
    //   }
    // }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;

  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: GradeEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingGradeManagement));
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
      const recordId = this.data? this.data.grade_id: 0;

      this.store.dispatch(new ProcessingGradeManagement());
      if(this.inEditMode()) {
        this.store.dispatch(new UpdateGradeManagement({data: this.fs.value, recordId: recordId}));
      } else {
        this.store.dispatch(new SaveGradeManagement({ data: this.fs.value }));
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
