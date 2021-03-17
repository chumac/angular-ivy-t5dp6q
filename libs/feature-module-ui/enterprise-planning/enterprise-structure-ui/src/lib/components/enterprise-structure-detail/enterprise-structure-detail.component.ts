import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Inject,
  OnDestroy,
  ElementRef
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';


import {
  IgxGridComponent,
} from 'igniteui-angular';
import { ISelectOption } from '@nutela/models/core-data';
import {
  IEnterpriseStructure,
  IEnterpriseStructureDetail
} from '../../models/interfaces';
import {
  SelectComponent
} from 'ng-uikit-pro-standard';
import {
  EnterpriseStructureDetailService,
  EnterpriseStructureSharedDataService,
  EnterpriseStructureUtilService
} from '../../services';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { EnterpriseStructureDetailEditorComponent } from './enterprise-structure-detail-editor/enterprise-structure-detail-editor.component';
import {
  LoadEnterpriseStructureDetails,
  showEditorEnterpriseStructureDetail,
  getEnterpriseStructureDetails,
  ShowEditorEnterpriseStructureDetail,
  DeactivateDataEnterpriseStructureDetail,
  HideEditorEnterpriseStructureDetail,
  HideMoverEnterpriseStructureDetail,
  ProcessingEnterpriseStructureDetail,
  isProcessingEnterpriseStructureDetail,
  getEnterpriseStructureLink,
  LoadEnterpriseStructureLink,
  LoadSelectedRowsData,
  LoadStructureNameAndIdData
} from '../../store/enterprise-structure-detail';
import {
  getEnterpriseStructureTypes,
  LoadEnterpriseStructureTypes
} from '../../store/enterprise-structure-type';
import { getActivePersonnel } from '@nutela/store/modules/foundation';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { IEnterpriseStructureState } from '../../store/root';

@Component({
  selector: 'x365-fm-es-enterprise-structure-detail',
  templateUrl: './enterprise-structure-detail.component.html',
  styleUrls: ['./enterprise-structure-detail.component.scss'],
  providers: [EnterpriseStructureDetailService]
})
export class EnterpriseStructureDetailComponent implements OnInit, OnDestroy {
  searchTerm: string;
  dropDownFilterValue: string;

  isProcessing$: Observable<boolean>;
  showEditor$: Observable<boolean>;
  showMover$: Observable<boolean>;
  showDemoter$: Observable<boolean>;
  showPromoter$: Observable<boolean>;
  activePersonnel$: Observable<ISelectOption[]>;
  enterpriseStructureData$: Observable<IEnterpriseStructure[]>;
  analysisDetailsData$: Observable<IEnterpriseStructureDetail[]>;
  analysisDetailsLinkData$: Observable<ISelectOption[]>;
  multipleSelected: boolean;
  entStrucDetailsTransformed: ISelectOption[];
  enterpriseStructures: IEnterpriseStructure[];
  higherStructures: IEnterpriseStructure[];
  lowerStructures: IEnterpriseStructure[];
  selectedRowsList: any[];
  selectedDetIds: any[];

  @Input() structureIdLink: number;
  @Input() data: any[] = null;
  structureId: number;

  @ViewChild('editor') editor: EnterpriseStructureDetailEditorComponent;
  @ViewChild('analysisDetailsGrid', { read: IgxGridComponent })
  analysisDetailsGrid: IgxGridComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    private store: Store<IEnterpriseStructureState>,
    public service: EnterpriseStructureDetailService,
    public route: ActivatedRoute,
    private router: Router,
    public utilService: EnterpriseStructureUtilService,
    private dialogBoxService: DialogBoxService,
    private dataShare: EnterpriseStructureSharedDataService
  ) {
    titleService.setTitle(
      `${'Enterprise Structure Details'}${this.partialDocumentTitle}`
    );
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatch();

    this.route.params.subscribe(v => {
      this.structureId = v.id;
      this.sendNameAndIdToStore(v.id, v.name);
      this.store.dispatch(
        new LoadEnterpriseStructureDetails({ recordId: v.id })
      );

    });
    this.getTransformedStructureDetail();
  }

  sendNameAndIdToStore(id: number, name: string) {
    this.store.dispatch(
      new LoadStructureNameAndIdData({ id: id, name: name })
    );
  }
  storeSelects() {
    this.isProcessing$ = this.store.pipe(
      select(isProcessingEnterpriseStructureDetail)
    );
    this.showEditor$ = this.store.pipe(
      select(showEditorEnterpriseStructureDetail)
    );
    this.analysisDetailsData$ = this.store.pipe(
      select(getEnterpriseStructureDetails)
    );
    this.enterpriseStructureData$ = this.store.pipe(
      select(getEnterpriseStructureTypes)
    );
    this.activePersonnel$ = this.store.pipe(select(getActivePersonnel));
    this.analysisDetailsLinkData$ = this.store.pipe(
      select(getEnterpriseStructureLink)
    );
  }

  storeDispatch() {
    this.store.dispatch(new ProcessingEnterpriseStructureDetail());
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

    if (this.analysisDetailsGrid) {
      this.service.search(this.analysisDetailsGrid, searchString, filterBy);
    }
  }

  getTransformedStructureDetail() {
    this.analysisDetailsData$.subscribe(val => {
      this.entStrucDetailsTransformed = this.utilService.transformToSelectDataList(
        val,
        'analysis_det_id_link',
        'description'
      );
    });
  }

  onRowClickChange(e) {
    if (e.newSelection.length > 1) {
      this.multipleSelected = true;
    } else {
      this.multipleSelected = false;
    }
    this.selectedRowsList = e.newSelection;
    this.store.dispatch(new LoadSelectedRowsData(e.newSelection));
  }
  getRowData$(rowId: number): Observable<IEnterpriseStructureDetail> {
    return this.analysisDetailsData$.pipe(
      map(d => d.filter(v => v.analysis_det_id === rowId)),
      map(e => e.shift())
    );
  }

  getStructureData$(analysisId: number): Observable<IEnterpriseStructure> {
    return this.enterpriseStructureData$.pipe(
      map(d => d.filter(v => v.analysis_id == analysisId)),
      map(e => e.shift())
    );
  }

  getStructureDataByIdLink$(
    analysisIdLink: number
  ): Observable<IEnterpriseStructure> {
    return this.enterpriseStructureData$.pipe(
      map(d => d.filter(v => v.analysis_id == analysisIdLink)),
      map(e => e.shift())
    );
  }

  onEditIconClicked(rowId: number) {
    this.getStructureData$(this.structureId).pipe(take(1)).subscribe(val => {
      this.store.dispatch(
        new LoadEnterpriseStructureLink({ recordId: val.analysis_id_link })
      );
      // this.structureIdLink = val.analysis_id_link;
    });
    this.editor.data = null;

    this.getRowData$(rowId)
      .pipe(take(1))
      .subscribe(result => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorEnterpriseStructureDetail());
      });
  }

  onManageIconClicked(rowID: number) {
    this.getRowData$(rowID).pipe(take(1)).subscribe(v => {
      this.store.dispatch(new LoadSelectedRowsData([v]));
    });
    this.router.navigate([STANDARD_ROUTES.manageEnterpriseStructure]);
  }

  onDeactivateIconClicked(rowId: number) {
    this.dialogBoxService
      .show(`Are you sure you want to deactivate this data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.getRowData$(rowId).pipe(take(1)).subscribe(result => {
            this.store.dispatch(
              new DeactivateDataEnterpriseStructureDetail({
                recordId: rowId,
                data: <IEnterpriseStructureDetail>result
              })
            );
          });
        }
      });
  }

  goBack() {
    this.router.navigate([`${STANDARD_ROUTES.enterpriseStructuretypes}`]);
  }

  onAddButtonClicked() {
    this.store.dispatch(new ShowEditorEnterpriseStructureDetail());
  }

  onDeactivateButtonClicked() { }

  onManageButtonClicked() {
    this.router.navigate([`${STANDARD_ROUTES.manageEnterpriseStructure}`]);
  }

  onRefresh() {
    this.store.dispatch(
      new LoadEnterpriseStructureDetails({ recordId: this.structureId })
    );
    this.store.dispatch(
      new ShowToast({
        title: null,
        message: `Data is being refreshed.`,
        type: ToastTypes.INFO
      })
    );
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorEnterpriseStructureDetail());
    this.store.dispatch(new HideMoverEnterpriseStructureDetail());
  }

  unsubscribe() { }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
