
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { IPromotion, ICurrentGradePaygroup } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { PromotionEditorService } from './promotion-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import DataSource from 'devextreme/data/data_source';
import { IEmployeesProfileState } from '../../../../../store';
import { ProcessingPromotion, SaveDataPromotion, isProcessingPromotion, LoadPaygroupDataPromotion, LoadEmployeeCurrentGradePaygroupDataPromotion, getEmployeeCurrentGradePaygroupDataPromotion, LoadCurrentPaygroupDataPromotion, LoadPaygradeDataPromotion, getPaygradeSelectOptionDataPromotion, getCurrentPaygroupSelectOptionDataPromotion, getPaygroupSelectOptionDataPromotion, getArrearsStatusDataPromotion, getActionDataPromotion } from '../../../../../store/hr-transactions/promotion';


@Component({
  selector: 'x365-fm-workforce-promotions-promotion-editor',
  templateUrl: './promotion-editor.component.html',
  styleUrls: ['./promotion-editor.component.scss'],
  providers: [PromotionEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public activePersonnel: ISelectOption[];
  @Input() public paygradeSelectOption: ISelectOption[];
  @Input() public paygroupSelectOption: ISelectOption[];
  @Input() public currentPaygradeSelectOption: ISelectOption[];
  @Input() public currentPaygroupSelectOption: ISelectOption[];
  @Input() public arrearsStatusSelectOption: ISelectOption[];
  @Input() public actionSelectOption: ISelectOption[];
  @Input() public data: IPromotion;

  isProcessing$: Observable<boolean>;
  currPaygradeSelectOption$: Observable<ISelectOption[]>;
  newPaygradeSelectOption$: Observable<ISelectOption[]>;
  newPaygroupSelectOption$: Observable<ISelectOption[]>;
  currentPaygradeSelectOption$: Observable<ISelectOption[]>;
  currentPaygroupSelectOption$: Observable<ISelectOption[]>;
  arrearsStatusSelectOption$: Observable<ISelectOption[]>;
  actionSelectOption$: Observable<ISelectOption[]>;
  employeeCurrentGradeAndPaygroup$: Observable<ICurrentGradePaygroup>;


  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if(changes['data']) {
      this.fs.init(this.data);
    }

    if(this.show===false){
      this.fs.initializeForm();
    }
  }

  constructor(
    public fs: PromotionEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingPromotion));
    this.employeeCurrentGradeAndPaygroup$ = this.store.pipe(select(getEmployeeCurrentGradePaygroupDataPromotion));

    this.currPaygradeSelectOption$ = this.store.pipe(select(getPaygradeSelectOptionDataPromotion));
    this.newPaygradeSelectOption$ = this.store.pipe(select(getPaygradeSelectOptionDataPromotion));
    this.newPaygroupSelectOption$ = this.store.pipe(select(getPaygroupSelectOptionDataPromotion));
    this.currentPaygradeSelectOption$ = this.store.pipe(select(getPaygradeSelectOptionDataPromotion));
    this.currentPaygroupSelectOption$ = this.store.pipe(select(getCurrentPaygroupSelectOptionDataPromotion));
    this.arrearsStatusSelectOption$ = this.store.pipe(select(getArrearsStatusDataPromotion));
    this.actionSelectOption$ = this.store.pipe(select(getActionDataPromotion));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onEmployeeSelected(event: any) {
    this.fs.curGradeId.setValue(null);
    this.fs.curGroupId.setValue(null);
    if(event.value) {
      this.store.dispatch(new LoadEmployeeCurrentGradePaygroupDataPromotion({employeeId: event.value}));
      this.employeeCurrentGradeAndPaygroup$.subscribe(val => {
        if(val) {
          this.store.dispatch(new LoadCurrentPaygroupDataPromotion());
          this.store.dispatch(new LoadPaygradeDataPromotion());
          this.fs.updateCurrentGradeAndPaygroup(val);
        }
      })
    }
  }

  onProcessDifferentialChecked(event) {
    this.fs.isProcessDifferential = event.target.checked;
    this.fs.patch({
      p_diff_quarterly: event.target.checked,
      p_diff_halfyear: event.target.checked,
      p_diff_year: event.target.checked,
      p_diff_triquart: event.target.checked,
    })
  }

  onNewGradeSelected(event) {
    console.log(event.value);
    this.fs.newGroupId.setValue(null);
    this.store.dispatch(new LoadPaygroupDataPromotion({gradeId: event.value}));
  }

  onSubmit() {
    if (this.fs.valid) {
      this.fs.transformDatesInput();
      const recordId = this.data? this.data.id: 0;
      this.store.dispatch(new ProcessingPromotion());
      this.store.dispatch(new SaveDataPromotion({data: this.fs.value, promotion_id: recordId, editMode: this.inEditMode()}));
    } else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
    this.fs.initializeForm();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
