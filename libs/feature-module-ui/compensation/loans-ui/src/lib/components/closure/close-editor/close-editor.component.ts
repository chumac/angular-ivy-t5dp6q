import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { CloseEditorService } from './close-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { FilePickerComponent, DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';
import { IClosure } from '@nutela/models/compensation/loans';
import { isProcessingClosure, ProcessingClosures, SaveClosure, NotProcessingClosures } from '../../../store/closure';
import { IApprovedLoan } from 'libs/models/compensation/loans/src/lib/interfaces/approved-loan.interface';
import { ILoanState } from '../../../store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'x365-fm-loans-close-editor',
  templateUrl: './close-editor.component.html',
  styleUrls: ['./close-editor.component.scss'],
  providers: [CloseEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CloseEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  activePersonnelDataSource: any = null;

  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IApprovedLoan;

  @Input() public activePersonnel: ISelectOption[];

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.fs.init(this.data);
    }

    if (this.show === false) {
      this.reset();
    }
  }

  @ViewChild('filePicker') filePicker: FilePickerComponent;

  isProcessing$: Observable<boolean>;

  constructor(
    public fs: CloseEditorService,
    public utilService: UtilService,
    private store: Store<ILoanState>,
    private cd: ChangeDetectorRef, private dialogBoxService: DialogBoxService
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeSelects();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingClosure));

  }

  storeDispatches() {

  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.dialogBoxService.show(`Are you sure you want to delete this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.fs.loanDetailId.setValue(this.data.loandetail_id);
          if (this.fs.valid) {
            const recordId = this.data ? this.data.loandetail_id : 0;
            this.store.dispatch(new ProcessingClosures());
            this.store.dispatch(new SaveClosure({ data: <IClosure>this.fs.value }));
          } else {
            this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
          }
        }
      });

  }


  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  onCancel() {
    this.store.dispatch(new NotProcessingClosures());
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
