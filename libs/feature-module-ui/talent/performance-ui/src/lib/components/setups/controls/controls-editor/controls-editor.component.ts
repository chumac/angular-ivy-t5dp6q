import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ControlsEditorService } from './controls-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IControl, IPage, ISection } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingControl, ProcessingControl, SaveControl, AddControl, getCustomPageListControl, LoadCustomPageListControl, getSectionListControl, LoadSectionListControl } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-controls-editor',
  templateUrl: './controls-editor.component.html',
  styleUrls: ['./controls-editor.component.scss'],
  providers: [ControlsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ControlsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IControl;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  customPageList$: Observable<IPage[]>;
  sectionList$: Observable<ISection[]>;

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

  constructor(public utilService: UtilService, public fs: ControlsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }


  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadCustomPageListControl(this.assetConstants.customPage));
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(select(isProcessingControl));
    this.customPageList$ = this.store.pipe(select(getCustomPageListControl));
    this.sectionList$ = this.store.pipe(select(getSectionListControl));
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

  onPageSelected(data){
    // this.sectionList$ = null;
    this.store.dispatch(new LoadSectionListControl({ pageID: data.value, widgetID: this.widgetConstants.section}));
  }

  onFileSelected($event){}

  onSubmit(){
    this.fs.assetType.setValue(this.assetConstants.customPage);
    this.fs.assetKey.setValue('control');
    if (this.fs.valid) {
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingControl());
        this.store.dispatch(new SaveControl({data: <IControl>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingControl());
        this.store.dispatch(new AddControl({data: <IControl>this.fs.value }));
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
