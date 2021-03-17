import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IEventDetailAssetAvaiability, IEventDetailAssets, IEventDetailType } from '@nutela/models/talent/learning';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { LoadDataAssets, showEditorAssets, LoadDataAssetsType, getAssetsType, LoadDataAvailableAssets, getAssetsAvailableData, HideViewerAssets, DeleteDataAssets, showViewerAssets, getAssetsData, HideEditorAssets, ShowViewerAssets, ShowEditorAssets, LoadDocumentAssets, getDocumentAssetsData } from '../../../../../store';
import { AssetsService } from './event-detail-assets.service';
import { EventDetailAssetsEditorComponent } from './event-detail-assets-editor/event-detail-assets-editor.component';
import { EventDetailAssetsViewerComponent } from './event-detail-assets-viewer/event-detail-assets-viewer.component';

@Component({
  selector: 'x365-fm-talent-event-detail-assets',
  templateUrl: './event-detail-assets.component.html',
  styleUrls: ['./event-detail-assets.component.scss']
})

export class EventDetailAssetsComponent implements OnInit {

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  AssetsData$: Observable<IEventDetailAssets[]>;
  AssetsDocument$: Observable<any[]>;
  AssetsDataAvailable$: Observable<IEventDetailAssetAvaiability[]>;
  AssetsDataType$: Observable<IEventDetailType[]>;

  @Input() eventDetailId: number;
  @Input() isReview: number;
  @Input() isOpen: number;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: EventDetailAssetsEditorComponent;
  @ViewChild('viewer') viewer: EventDetailAssetsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

  constructor(private store: Store<IAppState>, public service: AssetsService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataAssets({ recordId: this.eventDetailId }));
    this.store.dispatch(new LoadDataAvailableAssets);
    this.store.dispatch(new LoadDataAssetsType);
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorAssets));
    this.showViewer$ = this.store.pipe(select(showViewerAssets));
    this.AssetsData$ = this.store.pipe(select(getAssetsData));
    this.AssetsDocument$ = this.store.pipe(select(getDocumentAssetsData));
    this.AssetsDataAvailable$ = this.store.pipe(select(getAssetsAvailableData));
    this.AssetsDataType$ = this.store.pipe(select(getAssetsType));
  }

  getRowData$(rowId: number): Observable<IEventDetailAssets> {
    return this.AssetsData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorAssets());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorAssets());
      }
      );
  }

  onRefreshButtonClicked() {
    this.store.dispatch(new LoadDataAssets({ recordId: this.eventDetailId }));
    this.store.dispatch(new ShowToast({ title: null, message: `Assets Information is being refreshed.`, type: ToastTypes.INFO }));
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorAssets());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerAssets());
  }

  onViewIconClicked(rowId: number, asset_guid, asset_ext) {
    if (asset_guid) {
      this.store.dispatch(new LoadDocumentAssets({ docGuid: asset_guid, docExt: asset_ext }));
    }
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerAssets());
      }
      );
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataAssets({ recordId: rowId, eventDetailId: this.eventDetailId }));
        }
      });
  }

  filter(term: string, filterValue: string) {
    if (this.grid) {
      if (filterValue) {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.grid.clearFilter();
        this.grid.filteringLogic = FilteringLogic.Or;
        this.grid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
