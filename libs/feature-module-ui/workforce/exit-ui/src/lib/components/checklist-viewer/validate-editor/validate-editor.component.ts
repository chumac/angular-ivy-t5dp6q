import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs';
import { ValidateEditorService } from './validate-editor.service';
import { UtilService } from '@nutela/core-services';
import { Store } from '@ngrx/store';
import { ISelectOption } from '@nutela/models/core-data';
import { IReviewChecklist } from 'libs/models/workforce/exit/src/lib/interfaces';
import { IExitState } from '../../../store/root';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'x365-fm-workforce-exit-validate-editor',
  templateUrl: './validate-editor.component.html',
  styleUrls: ['./validate-editor.component.scss'],
  providers: [ValidateEditorService]
})
export class ValidateEditorComponent extends BaseFormComponent
  implements OnInit {
  @Input() public show: boolean;
  @Input() public width: number;

  @Input() public data: IReviewChecklist;
  @Input() public roleSelectOption: ISelectOption[];
  @Input() public confirmationSelectOption: ISelectOption[];
  @Input() public defaultCurrencySelectOption: ISelectOption[];
  @Input() public paygroupSelectOption: ISelectOption[];
  @Input() public activePersonnel: ISelectOption[];

  activePersonnelDataSource: any = null;

  @Output() cancelClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activePersonnel']) {
      this.activePersonnelDataSource = new DataSource({
        paginate: true,
        pageSize: 50,
        store: this.activePersonnel
      });
    }

    if (changes['data']) {
      this.fs.init(this.data);
    }
    if (this.show === false) {
      this.fs.form = this.fs.buildForm();
    }
  }

  isProcessing$: Observable<boolean>;
  constructor(
    public fs: ValidateEditorService,
    public utilService: UtilService,
    private store: Store<IExitState>
  ) {
    super();
  }
  ngOnInit() {
    this.storeSelects();
  }

  storeSelects() {
    // this.isProcessing$ = this.store.pipe(select(isProcessingChecklistSetup));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onConfirmationSelected(event) {
    event.value == 2
      ? (this.fs.showPaygroups = true)
      : (this.fs.showPaygroups = false);
  }

  public options: Object = {
    placeholderText: 'Type Message',
    events: {
      focus: function(e, editor) { }
    },
    height: '350',
    theme: 'gray',
    fileUpload: false,
    emoticonsUseImage: false,
    pluginsEnabled: [
      'align',
      'charCounter',
      'colors',
      'fontFamily',
      'fontSize',
      'lineBreaker',
      'list',
      'lineHeight',
      'url'
    ],
    // toolbarInline: true,
    toolbarSticky: false
  };

  onSubmit() {
    // if (this.fs.valid) {
    //   this.store.dispatch(new ProcessingChecklistSetup());
    //   this.inEditMode() ? this.store.dispatch(new SaveUpdateChecklistSetup({ data: this.fs.value, recordId: this.data.checklist_id })) : this.store.dispatch(new SaveChecklistSetup({ data: this.fs.value }));
    // } else {
    //   this.store.dispatch(new ShowToast({ title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError() }));
    // }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(
      this.validate(this.fs.f, this.fs.validationMessages)
    );
  }

  onCancel() {
    // this.store.dispatch(new NotProcessingChecklistSetup());
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }
}
