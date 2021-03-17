import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IFormTemplateDetail, IPage } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorFormTemplateDetail, showViewerFormTemplateDetail, getFormTemplateDetailData, LoadDataFormTemplateDetail, ShowEditorFormTemplateDetail, HideEditorFormTemplateDetail, DeleteDataFormTemplateDetail, ShowViewerFormTemplateDetail, getFormTemplateDetailPageList } from '../../../store/setups';
import { FormTemplateDetailsEditorComponent } from './form-template-details-editor/form-template-details-editor.component';
import { FormTemplateDetailsViewerComponent } from './form-template-details-viewer/form-template-details-viewer.component';
import * as constants from '../../../constants';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { FormTemplateDetailsService } from './form-template-detail.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'x365-fm-talent-form-template-details',
  templateUrl: './form-template-details.component.html',
  styleUrls: ['./form-template-details.component.scss'],
  providers: [FormTemplateDetailsService],
})
export class FormTemplateDetailsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  formTemplateDetailData$: Observable<IFormTemplateDetail[]>;
  assetOptions = constants.assetOptions;
  rankOptions = constants.rankOptions;
  permOptions = constants.permOptions;

  @ViewChild('editor') editor: FormTemplateDetailsEditorComponent;
  @ViewChild('viewer') viewer: FormTemplateDetailsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  dropDownFilterValue: string;
  currFormTemplateId: number = +this.route.snapshot.paramMap.get('id');


  constructor(private store: Store<IAppState>, private location: Location, private route: ActivatedRoute, public service: FormTemplateDetailsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFormTemplateDetail({formTemplateId: this.currFormTemplateId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFormTemplateDetail));
    this.showViewer$ = this.store.pipe(select(showViewerFormTemplateDetail));
    this.formTemplateDetailData$ = this.store.pipe(select(getFormTemplateDetailData));
  }

  getRowData$(rowId: number): Observable<IFormTemplateDetail> {
    return this.formTemplateDetailData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.formTemplateId = this.currFormTemplateId;
    this.store.dispatch(new ShowEditorFormTemplateDetail());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataFormTemplateDetail({formTemplateId: this.currFormTemplateId}));
    this.store.dispatch(new ShowToast({title: null, message: `Form Template Detail Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.editor.formTemplateId = this.currFormTemplateId;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.pagesLookUp.value = result.AssetInfo?result.AssetInfo.id:null;
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorFormTemplateDetail());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerFormTemplateDetail());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataFormTemplateDetail({recordId: rowId, formTemplateId: this.currFormTemplateId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFormTemplateDetail());
  }

  onCancelViewer() {

  }

  goBack() {
    this.location.back();
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

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }


  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
