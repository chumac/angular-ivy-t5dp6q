import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { PagesEditorService } from './pages-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IPage } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingPage, ProcessingPage, SavePage, AddPage, getPageType, LoadPageType } from '../../../../store';
import { ISelectOption } from '@nutela/models/core-data';


@Component({
  selector: 'x365-fm-talent-pages-editor',
  templateUrl: './pages-editor.component.html',
  styleUrls: ['./pages-editor.component.scss'],
  providers: [PagesEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PagesEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IPage;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  pageTypes$: Observable<ISelectOption[]>;

  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  assetOptions = constants.assetOptions;
  widgetOptions = constants.widgetOptions;
  permOptions = constants.permOptions;
  pageOptions = constants.WIDGET_OPT_CONSTANTS;
  assetConstants = constants.ASSET_TYPE_CONSTANTS;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: PagesEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.store.dispatch(new LoadPageType());
    this.pageTypes$ = this.store.pipe(select(getPageType));
    this.isProcessing$ = this.store.pipe(select(isProcessingPage));
  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onCancel() {
    this.data = null;
    this.reset();
    this.cancelClick.emit();
  }

  onFileSelected($event){}

  onSubmit(){
    this.fs.assetKey.setValue('page');
    this.fs.widget.setValue(this.pageOptions.page);

    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingPage());
        this.store.dispatch(new SavePage({data: <IPage>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingPage());
        this.store.dispatch(new AddPage({data: <IPage>this.fs.value }));
      }

    } else {
     this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
    }
  }

  getErrorMessage() {
    return this.utilService.errorHtmlString(this.validate(this.fs.f, this.fs.validationMessages));
  }

  reset() {
    this.fs.f.reset();
    this.fs.init(this.data);
  }

  ngOnDestroy() {
  }

} 
