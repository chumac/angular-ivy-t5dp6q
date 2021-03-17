import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorCustomForm, showViewerCustomForm, getCustomFormData, LoadDataCustomForm, ShowEditorCustomForm, HideEditorCustomForm, DeleteDataCustomForm, ShowViewerCustomForm, isProcessingCustomForm, ProcessingCustomForm, HideViewerCustomForm, LoadEligibilityListCustomForm, LoadScopeListCustomForm, LoadAreaListCustomForm, LoadTypeListCustomForm, LoadWorkFlowListCustomForm } from '../../../store/processes/custom-form';
import { CustomFormsEditorComponent } from './custom-forms-editor/custom-forms-editor.component';
import { CustomFormsViewerComponent } from './custom-forms-viewer/custom-forms-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { CustomFormsService } from './custom-forms.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { ICustomForm } from '@nutela/models/workforce/employee-profiles';
import { Router } from '@angular/router';
import { CUSTOM_FORM_URLs } from '../../../constants';


@Component({
  selector: 'x365-fm-talent-custom-forms',
  templateUrl: './custom-forms.component.html',
  styleUrls: ['./custom-forms.component.scss'],
  providers: [CustomFormsService],

})
export class CustomFormsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;

  customFormData$: Observable<ICustomForm[]>;


  @ViewChild('editor') editor: CustomFormsEditorComponent;
  @ViewChild('viewer') viewer: CustomFormsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;

	dropDownFilterValue: string;

  constructor(private store: Store<IAppState>, private router: Router, public service: CustomFormsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataCustomForm());

    this.store.dispatch(new LoadTypeListCustomForm());
    this.store.dispatch(new LoadAreaListCustomForm());
    this.store.dispatch(new LoadScopeListCustomForm());
    this.store.dispatch(new LoadEligibilityListCustomForm());
    this.store.dispatch(new LoadWorkFlowListCustomForm());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCustomForm));
    this.showViewer$ = this.store.pipe(select(showViewerCustomForm));
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomForm));
    this.customFormData$ = this.store.pipe(select(getCustomFormData));
  }

  getRowData$(rowId: number): Observable<ICustomForm> {
    return this.customFormData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.reset();

    this.store.dispatch(new ShowEditorCustomForm());
  }

  onRefreshButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Custom Form definition Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCustomForm());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCustomForm());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataCustomForm({recordId: rowId}));
        }
      });
  }

  onConfigureIconClicked(rowId: number) {
    this.router.navigate([`${CUSTOM_FORM_URLs.formBulderPage}/${rowId}`], { skipLocationChange: false });
  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorCustomForm());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerCustomForm());
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
