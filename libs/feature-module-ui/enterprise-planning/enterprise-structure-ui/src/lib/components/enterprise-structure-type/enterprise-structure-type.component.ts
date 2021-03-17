import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Inject,
  ElementRef
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';

import { EnterpriseStructureTypeEditorComponent } from './enterprise-structure-type-editor/enterprise-structure-type-editor.component';

import {
  IgxGridComponent,
} from 'igniteui-angular';
import { ISelectOption } from '@nutela/models/core-data';
import {
  HideEditorEnterpriseStructureType,
  showEditorEnterpriseStructureType,
  ShowEditorEnterpriseStructureType,
  getEnterpriseStructureTypes,
  LoadEnterpriseStructureTypes,
  ShowEditorVirtualLink,
  showEditorVirtualLink,
  HideEditorVirtualLink,
  LoadVirtualLinks,
  DeactivateDataEnterpriseStructureType,
  isProcessingEnterpriseStructureType,
  ProcessingEnterpriseStructureType,
  NotProcessingEnterpriseStructureType
} from '../../store/enterprise-structure-type';
import { ActivatedRoute, Router } from '@angular/router';
import { VirtualLinkEditorComponent } from './virtual-link-editor/virtual-link-editor.component';
import { UtilService } from '@nutela/core-services';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Title } from '@angular/platform-browser';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { IEnterpriseStructure } from '../../models/interfaces';
import { EnterpriseStructureTypeService } from '../../services';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IEnterpriseStructureState } from '../../store/root';

@Component({
  selector: 'x365-fm-es-enterprise-structure-type',
  templateUrl: './enterprise-structure-type.component.html',
  styleUrls: ['./enterprise-structure-type.component.scss']
})
export class EnterpriseStructureTypeComponent implements OnInit {
  dropDownFilterValue: string;
  hide: boolean;

  showEditor$: Observable<boolean>;
  showVirtualLinkEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;
  awaitingApprovalData$: Observable<ISelectOption[]>;
  enterpriseStructureData$: Observable<IEnterpriseStructure[]>;

  transformedStructure: any[];
  sturctureId: number;

  @Input() data: any[] = null;

  @ViewChild('editor') editor: EnterpriseStructureTypeEditorComponent;
  @ViewChild('virtualLinkeditor') virtualLinkeditor: VirtualLinkEditorComponent;
  @ViewChild('enterpriseStructureGrid')
  enterpriseStructureGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private store: Store<IEnterpriseStructureState>,
    public service: EnterpriseStructureTypeService,
    public router: ActivatedRoute,
    private route: Router,
    public utilService: UtilService,
    private dialogBoxService: DialogBoxService
  ) {
    titleService.setTitle(
      `${'Enterprise Structure Types'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatch();
  }

  storeSelects() {
    this.isProcessing$ = this.store.pipe(
      select(isProcessingEnterpriseStructureType)
    );
    this.showEditor$ = this.store.pipe(
      select(showEditorEnterpriseStructureType)
    );
    this.showVirtualLinkEditor$ = this.store.pipe(
      select(showEditorVirtualLink)
    );
    this.enterpriseStructureData$ = this.store.pipe(
      select(getEnterpriseStructureTypes)
    );
  }

  storeDispatch() {
    this.store.dispatch(new ProcessingEnterpriseStructureType());
    this.store.dispatch(new LoadEnterpriseStructureTypes());
  }

  search() {
    let filterBy: string = '';
    let searchString: string = '';
    if (this.searchInput) {
      searchString = this.searchInput.nativeElement.value;
    }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.enterpriseStructureGrid) {
      this.service.search(this.enterpriseStructureGrid, searchString, filterBy);
    }
  }

  getRowData$(rowId: number): Observable<IEnterpriseStructure> {
    return this.enterpriseStructureData$.pipe(
      map(d => d.filter(v => v.analysis_id === rowId)),
      map(e => e.shift())
    );
  }

  onAdd() {
    this.store.dispatch(new ShowEditorEnterpriseStructureType());
  }

  onRefresh() {
    this.store.dispatch(new LoadEnterpriseStructureTypes());
    this.store.dispatch(
      new ShowToast({
        title: null,
        message: `Enterprise Structure data has been refreshed.`,
        type: ToastTypes.INFO
      })
    );
  }

  onDetailIconClicked(rowID: number) {
    this.getRowData$(rowID)
      .pipe(take(1))
      .subscribe(val => {
        this.route.navigate([
          `${STANDARD_ROUTES.enterpriseStructureDetails}/${
          val.Known_type
          }/${rowID}`
        ]);
      });
  }

  onVirtualLinkIconClicked(rowId) {
    if (this.virtualLinkeditor.show === false) {
      console.log('No virtual link here');
    }
    this.getRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        if (result.has_virtual_links) {
          this.sturctureId = rowId;
          this.store.dispatch(new LoadVirtualLinks({ recordId: rowId }));
          this.store.dispatch(new NotProcessingEnterpriseStructureType());
          this.store.dispatch(new ShowEditorVirtualLink());
        } else {
          this.store.dispatch(
            new ShowToast({
              title: null,
              message: `This structure has no virtual link.`,
              type: ToastTypes.INFO
            })
          );
        }
      });
  }

  onDeactivateCancelIconClicked(rowId) {
    this.dialogBoxService
      .show(`Are you sure you want to delete this data?`)
      .pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
            this.store.dispatch(
              new DeactivateDataEnterpriseStructureType({
                recordId: rowId,
                data: <IEnterpriseStructure>result
              })
            );
          });
        }
      });
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorEnterpriseStructureType());
      });
  }
  onCancelEditor() {
    this.store.dispatch(new HideEditorEnterpriseStructureType());
    this.store.dispatch(new HideEditorVirtualLink());
  }

  unsubscribe() { }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
