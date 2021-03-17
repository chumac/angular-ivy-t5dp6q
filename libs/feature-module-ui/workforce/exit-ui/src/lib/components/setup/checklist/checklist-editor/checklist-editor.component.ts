import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { BaseFormComponent, ToastTypes } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { ChecklistEditorService } from './checklist-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { ShowToast } from '@nutela/store/shared';
import { ISelectOption } from '@nutela/models/core-data';
import { IExitState } from '../../../../store/root';
import { isProcessingChecklistSetup, ProcessingChecklistSetup, SaveChecklistSetup, SaveUpdateChecklistSetup, NotProcessingChecklistSetup } from '../../../../store/setup/checklist';
import DataSource from 'devextreme/data/data_source';
import { IChecklistItem } from '../../../../interfaces';
import { DxLookupComponent } from 'devextreme-angular';

@Component({
  selector: 'x365-fm-workforce-exit-checklist-editor',
  templateUrl: './checklist-editor.component.html',
  styleUrls: ['./checklist-editor.component.scss'],
  providers: [ChecklistEditorService]
})

export class ChecklistEditorComponent extends BaseFormComponent implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IChecklistItem;
  @Input() public validationRoleSelectOption: any[];
  @Input() public securityRoleSelectOption: any[];
  @Input() public positionSelectOption: any[];
  @Input() public workflowSelectOption: any[];
  @Input() public activePersonnel: ISelectOption[];
  @Input() public customFormSelectOption: ISelectOption[] = [];

  @ViewChild('vRole') vRole: DxLookupComponent;

  activePersonnelDataSource: any = null;
  useCustomForm: boolean = false;
  showColleagueInput: boolean = false;
  showWorkflowInput: boolean = false;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    } else {
      this.fs.init(this.data);
    }
  }


  isProcessing$: Observable<boolean>;
  constructor(
    public fs: ChecklistEditorService,
    public utilService: UtilService,
    private store: Store<IExitState>) {
    super();
  }
  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingChecklistSetup));
  }

  // onRoleSelected(event) {
  //   if (event.value == 0) {
  //     this.showColleagueInput = true
  //     this.showWorkflowInput = false
  //   } else if (event.value == 1) {
  //     this.showWorkflowInput = true
  //     this.showColleagueInput = false
  //   }
  // }
  onConfirmationSelected(event) {
    event.value == 2 ? this.fs.showPaygroups = true : this.fs.showPaygroups = false;
  }

  onCustomFormChecked(event) {
    this.useCustomForm = event.target.value;
  }
  onSubmit() {
    if (this.fs.valid) {
      this.store.dispatch(new ProcessingChecklistSetup());
      this.data ? this.store.dispatch(new SaveUpdateChecklistSetup({ data: this.fs.value, recordId: this.data.id })) : this.store.dispatch(new SaveChecklistSetup({ data: this.fs.value }));
    } else {
      this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), type: ToastTypes.ERROR }));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingChecklistSetup());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }
}
