import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { SectionsEditorService } from './sections-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ISection, IPage } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingSection, ProcessingSection, SaveSection, AddSection, getCustomPageListSection, LoadCustomPageListSection } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-sections-editor',
  templateUrl: './sections-editor.component.html',
  styleUrls: ['./sections-editor.component.scss'],
  providers: [SectionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SectionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ISection;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  customPageList$: Observable<IPage[]>;

  eligibilityRuleOptions = constants.eligibilityRuleOptions;
  assetOptions = constants.assetOptions;
  widgetOptions = constants.widgetOptions;
  permOptions = constants.permOptions;
  assetConstants = constants.ASSET_TYPE_CONSTANTS;
  widgetConstants = constants.WIDGET_OPT_CONSTANTS;



  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
  }

  constructor(public utilService: UtilService, public fs: SectionsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }


  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCustomPageListSection(this.assetConstants.customPage));
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingSection));
    this.customPageList$ = this.store.pipe(select(getCustomPageListSection));
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
    if (this.fs.valid) {
      this.fs.assetKey.setValue('section');
      this.fs.widget.setValue(this.widgetConstants.section);
      this.fs.assetType.setValue(this.assetConstants.customPage);
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingSection());
        this.store.dispatch(new SaveSection({data: <ISection>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingSection());
        this.store.dispatch(new AddSection({data: <ISection>this.fs.value }));
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
