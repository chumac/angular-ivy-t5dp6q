import { Component, OnInit, OnDestroy, Input, EventEmitter, Output, ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BaseFormComponent } from '@nutela/shared/app-global';
import { Observable } from 'rxjs/internal/Observable';
import { toastOptionsError } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { ShowToast } from '@nutela/store/shared';

import { VirtualLinkEditorService } from './virtual-link-editor.service';
import { ProcessingEnterpriseStructureType, NotProcessingEnterpriseStructureType, isProcessingEnterpriseStructureType, getVirtualLinks, SaveVirtualLinks, isProcessingVirtualLinks } from '../../../store/enterprise-structure-type';

import { VirtualLinkPickerComponent } from './virtual-link-picker/virtual-link-picker.component';
import { IVirtualLinkTransform, IEnterpriseStructure } from '../../../models/interfaces';
import { EnterpriseStructureUtilService } from '../../../services';

@Component({
  selector: 'x365-fm-es-virtual-link-editor',
  templateUrl: './virtual-link-editor.component.html',
  styleUrls: ['./virtual-link-editor.component.scss'],
  providers: [VirtualLinkEditorService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualLinkEditorComponent extends BaseFormComponent
  implements OnInit, OnDestroy {

  isProcessingVlink$: Observable<boolean>;
  availableLinks$: Observable<IVirtualLinkTransform[]>;
  transformedStructure: IVirtualLinkTransform[];
  @Input() enterpriseStructures$: Observable<IEnterpriseStructure[]>
  showInput: boolean;
  clickedId: number

  @ViewChild('virtualLinksPicker') virtualLinksPicker: VirtualLinkPickerComponent;

  @Input() public show: boolean;
  @Input() public width: number;
  @Input() public data: any;
  @Input() public sturctureId: number;
  filteredAvailableLinks: IVirtualLinkTransform[];

  @Output() cancelClick = new EventEmitter<any>();
  @Output() showForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  vLink: any;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']) {
      this.fs.init(this.data);
    }

    if(this.show) {
      this.isProcessingVlink$ = this.store.pipe(select(isProcessingVirtualLinks));
      this.availableLinks$ = this.store.pipe(select(getVirtualLinks))
      this.availableLinks$.subscribe(link => {
        this.fs.initialLinks.setValue(link);
      });
      this.enterpriseStructures$.subscribe(result => {
        this.transformedStructure = this.utilService.transformToVirtualLinksDataList(result, 'analysis_id', 'description');
      })
    } else {
      this.reset();
      this.fs.form = this.fs.buildForm()
    }

  }

  constructor(
    public fs: VirtualLinkEditorService,
    public utilService: EnterpriseStructureUtilService,
    private store: Store<IAppState>,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.storeSelects() ;
    this.storeDispatch();

  }

  storeSelects() {

  }

  storeDispatch() {

  }

  inEditMode(): boolean {
    if (this.data) {
      return true;
    } else {
      return false;
    }
  }

  onArrowButtonClick(e) {
    this.fs.patch({
      analysis_id: e.map(i => {
       return i.analysis_id
      })
    })
  }

  onSubmit() {
    if(this.fs.valid) {
      this.store.dispatch(new ProcessingEnterpriseStructureType());
      this.store.dispatch(new SaveVirtualLinks({data: <IVirtualLinkTransform>this.fs.value.virtual_links, recordId: this.sturctureId}));
    }  else {
      this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: this.getErrorMessage(), options: toastOptionsError()}));
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
