
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { IPromotion, IEmployeePaygradeInfo, IDisciplinaryRoleDefinition } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { IStateSelectOption, ISelectOption } from '@nutela/models/core-data';
import { ImagePickerComponent, FilePickerComponent } from '@nutela/shared/ui';
import { DxLookupComponent } from 'devextreme-angular';
import { DefineRoleEditorService } from './define-role-editor.service';
import { IEmployeesProfileState } from '../../../../store';
import { ProcessingDisciplinaryRoleSetup, SaveDisciplinaryRoleSetup, AddDisciplinaryRoleSetup, isProcessingDisciplinaryRoleSetup } from '../../../../store/setups/disciplinary-role';


@Component({
  selector: 'x365-fm-workforce-define-role-editor',
  templateUrl: './define-role-editor.component.html',
  styleUrls: ['./define-role-editor.component.scss'],
  providers: [DefineRoleEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineRoleEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;
  isProcessDifferential: boolean = false;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IDisciplinaryRoleDefinition;
  // @Input() public employeeId: number;


  @Output() cancelClick = new EventEmitter<any>();

  @ViewChild('employeeId') employeeId: DxLookupComponent;

  payGroupSelectOption$: Observable<ISelectOption[]>;
  employeeCurrentGradeAndPaygroup$: Observable<IEmployeePaygradeInfo>;

  ngOnChanges(changes: SimpleChanges): void {
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;
  @ViewChild('imagePicker') imagePicker: ImagePickerComponent;

  isProcessing$: Observable<boolean>;

  stateList$: Observable<IStateSelectOption[]>;
  cityList$: Observable<ISelectOption[]>;

  constructor(
    public fs: DefineRoleEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingDisciplinaryRoleSetup));
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


  onSubmit() {
    if (this.fs.valid) {
      const recordId = this.data? this.data.id: 0;

      this.store.dispatch(new ProcessingDisciplinaryRoleSetup());
      if(this.inEditMode()) {
        this.store.dispatch(new SaveDisciplinaryRoleSetup({ data: this.fs.value, recordId: recordId }));
      } else {
        this.store.dispatch(new AddDisciplinaryRoleSetup({ data: this.fs.value }));
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
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }
}
