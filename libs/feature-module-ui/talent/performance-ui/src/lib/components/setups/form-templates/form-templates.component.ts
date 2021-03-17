import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IFormTemplate } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorFormTemplate, showViewerFormTemplate, getFormTemplateData, LoadDataFormTemplate, ShowEditorFormTemplate, HideEditorFormTemplate, DeleteDataFormTemplate, ShowViewerFormTemplate } from '../../../store/setups';
import { FormTemplatesEditorComponent } from './form-templates-editor/form-templates-editor.component';
import { FormTemplatesViewerComponent } from './form-templates-viewer/form-templates-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { FormTemplatesService } from './form-template.service'; 
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { Router } from '@angular/router';


@Component({
  selector: 'x365-fm-talent-form-templates',
  templateUrl: './form-templates.component.html',
  styleUrls: ['./form-templates.component.scss'],
  providers: [FormTemplatesService],
})
export class FormTemplatesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  formTemplateData$: Observable<IFormTemplate[]>;

  @ViewChild('editor') editor: FormTemplatesEditorComponent;
  @ViewChild('viewer') viewer: FormTemplatesViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
	dropDownFilterValue: string;


  constructor(private store: Store<IAppState>, private router: Router, public service: FormTemplatesService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataFormTemplate());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorFormTemplate));
    this.showViewer$ = this.store.pipe(select(showViewerFormTemplate));
    this.formTemplateData$ = this.store.pipe(select(getFormTemplateData));
  }

  getRowData$(rowId: number): Observable<IFormTemplate> {
    return this.formTemplateData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorFormTemplate());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataFormTemplate());
    this.store.dispatch(new ShowToast({title: null, message: `Form Template Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.eligibiltyRule = result.eligibility_rule;
          this.editor.reset();
          this.store.dispatch(new ShowEditorFormTemplate());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerFormTemplate());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataFormTemplate({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  onSetupFormDetailIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.formTemplateDetailSetup}/${rowId}`]);
  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorFormTemplate());
  }

  onCancelViewer() {

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
