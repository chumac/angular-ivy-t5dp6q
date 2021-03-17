import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';

import { ISelectOption } from '@nutela/models/core-data';

import { EnterpriseStructureTypeEditorService } from './enterprise-structure-type-editor.service';
import { ProcessingEnterpriseStructureType, SaveEnterpriseStructureType, NotProcessingEnterpriseStructureType, getEnterpriseStructureTypes, LoadEnterpriseStructureTypes, SaveUpdateEnterpriseStructureType, isProcessingEnterpriseStructureType, LoadKnownTypesEnterpriseStructure, getTransformedEnterpriseStructureTypes, getTransformedKnownTypes } from '../../../store/enterprise-structure-type';
import { IEnterpriseStructure } from '../../../models/interfaces';
import { SelectComponent } from 'ng-uikit-pro-standard';


@Component({
  selector: 'x365-fm-es-enterprise-structure-type-editor',
  templateUrl: './enterprise-structure-type-editor.component.html',
  styleUrls: ['./enterprise-structure-type-editor.component.scss'],
  providers: [EnterpriseStructureTypeEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnterpriseStructureTypeEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  isProcessing$: Observable<boolean>;
  showInput: boolean;
  entStrucTypeTransformed: ISelectOption[];
  isOthersSelected: boolean = true
  otherKnownTypeInput: string;

  enterpriseStructureTypesData$: Observable<IEnterpriseStructure[]>;
  knownTypeTransformed$: Observable<ISelectOption[]>;
  structureTransformed$: Observable<ISelectOption[]>;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IEnterpriseStructure;
  @Input() public activePersonnel: ISelectOption[];


  @Output() cancelClick = new EventEmitter<any>();
  @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('num') nameInputRef: ElementRef;
  @ViewChild('val') val: SelectComponent;



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.reset();
      this.fs.form = this.fs.buildForm()
    }
  }

  constructor(
    public fs: EnterpriseStructureTypeEditorService,
    public utilService: UtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatch();

  }

  storeSelects() {
    this.enterpriseStructureTypesData$ = this.store.pipe(select(getEnterpriseStructureTypes));
    this.isProcessing$ = this.store.pipe(select(isProcessingEnterpriseStructureType));
    this.structureTransformed$ = this.store.pipe(select(getTransformedEnterpriseStructureTypes));
    this.knownTypeTransformed$ = this.store.pipe(select(getTransformedKnownTypes));
  }

  storeDispatch() {
    this.store.dispatch(new LoadEnterpriseStructureTypes());
    this.store.dispatch(new LoadKnownTypesEnterpriseStructure());
  }

  getKnownType(item) {
    if (item.value === "Other") {
      this.isOthersSelected = false;
    } else {
      this.isOthersSelected = true;

    }
  }
  onOtherKnownTypeInput(event) {
    this.otherKnownTypeInput = event.target.value;
  }
  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }


  onSubmit() {
    if (this.fs.knownType.value === "Other") {
      this.fs.knownType.setValue(this.otherKnownTypeInput);
    }
    if (this.fs.valid) {
      if (this.inEditMode()) {
        const recordId = this.data ? this.data.analysis_id : 0;
        this.store.dispatch(new ProcessingEnterpriseStructureType());
        this.store.dispatch(new SaveUpdateEnterpriseStructureType({ data: <IEnterpriseStructure>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingEnterpriseStructureType());
        this.store.dispatch(new SaveEnterpriseStructureType({ data: <IEnterpriseStructure>this.fs.value }));
      }

    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingEnterpriseStructureType());
    this.fs.form = this.fs.buildForm();
    this.cancelClick.emit();

  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  getValue($event) {
    this.showInput = $event.target.checked;
  }

  ngOnDestroy() {
  }
}
