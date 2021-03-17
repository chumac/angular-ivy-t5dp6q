
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { IDesignationDefinition } from '@nutela/models/workforce/employee-profiles';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { IEmployeesProfileState } from '../../../../store';
import { ProcessingDesignationSetup, SaveDesignationSetup, AddDesignationSetup } from '../../../../store/setups/designation/designation.actions';
import { DefineDesignationEditorService } from './define-designation-editor.service';
import { isProcessingDesignationSetup } from '../../../../store/setups/designation';


@Component({
  selector: 'x365-fm-workforce-define-designation-editor',
  templateUrl: './define-designation-editor.component.html',
  styleUrls: ['./define-designation-editor.component.scss'],
  providers: [DefineDesignationEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineDesignationEditorComponent  extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;
  isProcessDifferential: boolean = false;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IDesignationDefinition;
  @Input() public positionSelectOption: ISelectOption[];


  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if(this.show===false){
      this.fs.form=this.fs.buildForm();
    }
  }


  isProcessing$: Observable<boolean>;

  constructor(
    public fs: DefineDesignationEditorService,
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
    this.isProcessing$ = this.store.pipe(select(isProcessingDesignationSetup))
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
      const recordId = this.data? this.data.title_id: 0;

      this.store.dispatch(new ProcessingDesignationSetup());
      this.store.dispatch(new SaveDesignationSetup({data: this.fs.value, recordId: recordId, editMode: this.inEditMode()}));
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
