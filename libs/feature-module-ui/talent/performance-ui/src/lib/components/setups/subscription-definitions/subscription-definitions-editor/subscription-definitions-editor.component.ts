import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy, ViewChild } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { SubscriptionDefinitionsEditorService } from './subscription-definitions-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { ISubscriptionDefinition, IPage } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingSubscriptionDefinition, ProcessingSubscriptionDefinition, SaveSubscriptionDefinition, AddSubscriptionDefinition, getSubscriptionPageListSubscriptionDefinition, LoadSubscriptionPageListSubscriptionDefinition } from '../../../../store';
import { DxLookupComponent } from 'devextreme-angular/ui/lookup';

@Component({
  selector: 'x365-fm-talent-subscription-definitions-editor',
  templateUrl: './subscription-definitions-editor.component.html',
  styleUrls: ['./subscription-definitions-editor.component.scss'],
  providers: [SubscriptionDefinitionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class SubscriptionDefinitionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: ISubscriptionDefinition;
  @Input() public pageId: number;
  @ViewChild('subscriptionLookup') subscriptionLookup: DxLookupComponent; 

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  subscriptionPageList$: Observable<IPage[]>; 
  assetConstants = constants.ASSET_TYPE_CONSTANTS;
  subscriptionOptions = constants.subscriptionOptions;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(changes['show'] && (this.show === true)) {
      this.fs.assetId.setValue(this.pageId);
    }
  }

  constructor(public utilService: UtilService, public fs: SubscriptionDefinitionsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingSubscriptionDefinition));
    this.subscriptionPageList$ = this.store.pipe(select(getSubscriptionPageListSubscriptionDefinition));
    this.store.dispatch(new LoadSubscriptionPageListSubscriptionDefinition(this.assetConstants.subscriptionPage));
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

  onSubscriptionSelected(data){
    this.fs.widgetGuid.setValue(data.value);
  }

  onSubmit(){
    if (this.fs.valid) {
      this.fs.widgetGuid.setValue(this.subscriptionLookup?this.subscriptionLookup.items[0].widget_guid:null);
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingSubscriptionDefinition());
        this.store.dispatch(new SaveSubscriptionDefinition({data: <ISubscriptionDefinition>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingSubscriptionDefinition());
        this.store.dispatch(new AddSubscriptionDefinition({data: <ISubscriptionDefinition>this.fs.value }));
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
