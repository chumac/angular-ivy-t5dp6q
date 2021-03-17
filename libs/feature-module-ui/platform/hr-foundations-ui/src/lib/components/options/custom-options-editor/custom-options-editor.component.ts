import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IOptions } from '@nutela/models/foundation';
import { BaseFormComponent } from '@nutela/shared/app-global';

import { Observable } from 'rxjs/internal/Observable';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { CustomOptionEditorService } from './custom-options-editor.service';
import { IHRFoundationState } from '../../../store/root';
import { Store, select } from '@ngrx/store';
import { isProcessingOption } from '../../../store/option/option.selectors';
import { ProcessingOption, SaveCustomOption,SaveGlobalOption, NotProcessingOption } from '../../../store/option';
import { ShowToast } from '@nutela/store/shared';



@Component({
  selector: 'x365-fm-plf-hrf-custom-options-editor',
  templateUrl: './custom-options-editor.component.html',
  styleUrls: ['./custom-options-editor.component.scss']
})
export class CustomOptionsEditorComponent extends BaseFormComponent implements OnInit, OnDestroy {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public formType: string;
  @Input() public helpText:string;
  @Input() public description:string;

  @Input() public data: IOptions;

  @Output() cancelClick = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  isProcessing$: Observable<boolean>;


  constructor(
    public fs: CustomOptionEditorService,
    public utilService: UtilService,
    private store: Store<IHRFoundationState>,
    private cd: ChangeDetectorRef) {
      super();
    }
    ngOnInit() {
      this.storeSelects();
    }


    storeSelects() {
      this.isProcessing$ = this.store.pipe(select(isProcessingOption));

    }

    inEditMode(): boolean {
      if (this.data) {
        return true;
      } else {
        return false;
      }
    }

    onSubmit() {
      if (this.fs.valid) {
        const optionKey = this.data? this.data.option_key: null;
        this.store.dispatch(new ProcessingOption());
        console.log('form type',this.formType);
        if(this.formType==="CUSTOM"){
          this.store.dispatch(new SaveCustomOption({data: this.fs.value, optionKey: optionKey}));
          console.log('running custom');
        }
        else if(this.formType==="GLOBAL"){
          this.store.dispatch(new SaveGlobalOption({data: this.fs.value}));
          console.log('runing global');
        }

      }
      else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
      }
    }

    getErrorMessage() {
      return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
    }

    onCancel() {
      this.store.dispatch(new NotProcessingOption());
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
