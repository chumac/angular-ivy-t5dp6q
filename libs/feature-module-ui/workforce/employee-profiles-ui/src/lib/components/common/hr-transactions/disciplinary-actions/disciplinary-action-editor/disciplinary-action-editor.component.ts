
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IComprehensiveData, IDisciplinaryActionTransaction, IRecommendationType } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent } from '@nutela/shared/ui';
import DataSource from 'devextreme/data/data_source';
import { IEmployeesProfileState } from '../../../../../store';
import { DisciplinaryActionEditorService } from './disciplinary-action-editor.service';
import { ProcessingDisciplinaryAction, SaveDataDisciplinaryAction, isProcessingDisciplinaryAction, NotProcessingDisciplinaryAction, LoadRecommendationDataDisciplinaryAction, getRecommendationDataDisciplinaryAction, LoadRecommendationSelectOptionDataDisciplinaryAction, isLoadingDisciplinaryAction, LoadingDisciplinaryAction, UpdateDataDisciplinaryAction } from '../../../../../store/hr-transactions/disciplinary-action';
import { DxLookupComponent } from 'devextreme-angular';
import { take } from 'rxjs/operators';


@Component({
  selector: 'x365-fm-workforce-disciplinary-action-editor',
  templateUrl: './disciplinary-action-editor.component.html',
  styleUrls: ['./disciplinary-action-editor.component.scss'],
  providers: [DisciplinaryActionEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisciplinaryActionEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSourceIssuedTo: any = null;
  activePersonnelDataSourceIssuedBy: any = null;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public activePersonnel: ISelectOption[];
  @Input() public takeActionSelectOption: ISelectOption[];
  @Input() public actionRoleSelectOption: ISelectOption[];
  @Input() public xRecommendationSelectOption: ISelectOption[];
  @Input() public hrRecommendationSelectOption: ISelectOption[];

  @Input() public data: IDisciplinaryActionTransaction;
  @Input() public employeeId: number;
  @Input() public comprehensiveData: IComprehensiveData;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['activePersonnel']) {
      this.activePersonnelDataSourceIssuedBy = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });

      this.activePersonnelDataSourceIssuedTo = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.fs.initializeForm();
      this.store.dispatch(new NotProcessingDisciplinaryAction());
    }
  }

  @ViewChild('issuedTo') issuedTo: DxLookupComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  recommendation$: Observable<IRecommendationType>;

  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: DisciplinaryActionEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingDisciplinaryAction));
    this.isLoading$ = this.store.pipe(select(isLoadingDisciplinaryAction));
    this.recommendation$ = this.store.pipe(select(getRecommendationDataDisciplinaryAction))
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onEmployeeSelected(event) {
    this.fs.xRecommendation.setValue(null);
  }

  onProcessDifferentialChecked(event) {
    console.log(event.value);
  }

  onNewGradeSelected(event) {
    console.log(event.value);
  }

  getRecommendation() {
    if (this.issuedTo.value) {
      this.store.dispatch(new LoadingDisciplinaryAction());
      this.store.dispatch(new LoadRecommendationDataDisciplinaryAction({ recordId: this.issuedTo.value }));

      this.recommendation$.pipe(take(2)).subscribe(val => {
        if (val) {
          this.fs.patch({
            x_recommendation_id: val.daction_type_id
          });
          this.store.dispatch(new LoadRecommendationSelectOptionDataDisciplinaryAction())
          if (this.fs.hrAction.value == 0 && this.fs.hrRecommendation.value == null) {
            this.fs.hrRecommendation.setValue(this.fs.xRecommendation.value);
          }

          this.fs.showReasonForDifference = this.fs.hrAction.value == 1 || false;
        }
      });

    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following', message: 'Please select the employee you want to issue this action to', type: ToastTypes.INFO }));
    }
  }

  removeRecommendation() {

    this.fs.patch({
      x_recommendation_id: null
    });
    this.fs.hrAction.setValue(1);
    this.fs.concurWithSystemRecommendation = false;
    this.fs.showReasonForDifference = false;
  }

  onTakeActionSelected(event) {
    if (!this.fs.xRecommendation.value && event.value == 0) {
      this.fs.hrAction.setValue(1);
      this.store.dispatch(new ShowToast({ title: 'Correct the following', message: 'You need to get system recommendation before you can concur', type: ToastTypes.INFO }));
    } else {
      this.fs.useHrRecommendationLogic(event.value);
    }
  }

  onSubmit() {
    this.fs.transformDatesInput();
    if (this.fs.valid) {
      const recordId = this.data ? this.data.daction_id : 0;

      this.store.dispatch(new ProcessingDisciplinaryAction());
      if (this.inEditMode()) {
        this.store.dispatch(new UpdateDataDisciplinaryAction({ data: this.fs.value, dactionId: recordId }));
      } else {
        this.store.dispatch(new SaveDataDisciplinaryAction({ data: this.fs.value }));
      }

    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingDisciplinaryAction());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);

  }

  ngOnDestroy() {
  }
}
