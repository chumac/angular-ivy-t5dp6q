import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { BaseFormComponent, FILE_EXTENSIONS } from '@nutela/shared/app-global';
import { Store, select } from '@ngrx/store';
import { UtilService, toastOptionsError } from '@nutela/core-services';
import { ContractPageDefinitionsEditorService } from './contract-page-definitions-editor.service';
import { ShowToast } from '@nutela/store/shared';
import { Observable } from 'rxjs/internal/Observable';
import { IContractPageDefinition, IPage } from '@nutela/models/talent/performance';
import * as constants from '../../../../constants';
import { IPerformanceState, isProcessingContractPageDefinition, ProcessingContractPageDefinition, SaveContractPageDefinition, AddContractPageDefinition, getContractPageListContractPageDefinition, LoadContractPageListContractPageDefinition } from '../../../../store';


@Component({
  selector: 'x365-fm-talent-contract-page-definitions-editor',
  templateUrl: './contract-page-definitions-editor.component.html',
  styleUrls: ['./contract-page-definitions-editor.component.scss'],
  providers: [ContractPageDefinitionsEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ContractPageDefinitionsEditorComponent extends BaseFormComponent
implements OnInit, OnDestroy  {

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: IContractPageDefinition;
  @Input() public guid: string;

  @Output() cancelClick = new EventEmitter<any>();
  isProcessing$: Observable<boolean>;
  contractPageList$: Observable<IPage[]>; 
  assetConstants = constants.ASSET_TYPE_CONSTANTS;

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['data']) {
      this.fs.init(this.data);
    }
    if(changes['show'] && (this.show === true)) {
      this.store.dispatch(new LoadContractPageListContractPageDefinition(this.assetConstants.contractPage));
      this.fs.widgetGuid.setValue(this.guid);
    }
  }

  constructor(public utilService: UtilService, public fs: ContractPageDefinitionsEditorService, private store: Store<IPerformanceState>) { 
    super();
  }

  ngOnInit() {
    this.isProcessing$ = this.store.pipe(select(isProcessingContractPageDefinition));
    this.contractPageList$ = this.store.pipe(select(getContractPageListContractPageDefinition));
    this.store.dispatch(new LoadContractPageListContractPageDefinition(this.assetConstants.contractPage));
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
      if(this.inEditMode()){
        const recordId = this.data.id;
        this.store.dispatch(new ProcessingContractPageDefinition());
        this.store.dispatch(new SaveContractPageDefinition({data: <IContractPageDefinition>this.fs.value, recordId: recordId, editMode: this.inEditMode() }));
      } else {
        this.store.dispatch(new ProcessingContractPageDefinition());
        this.store.dispatch(new AddContractPageDefinition({data: <IContractPageDefinition>this.fs.value }));
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
