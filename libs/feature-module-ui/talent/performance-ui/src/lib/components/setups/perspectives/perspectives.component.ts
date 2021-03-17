import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPerspective } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorPerspective, showViewerPerspective, getPerspectiveData, LoadDataPerspective, ShowEditorPerspective, HideEditorPerspective, DeleteDataPerspective, ShowViewerPerspective } from '../../../store/setups';
import { PerspectivesEditorComponent } from './perspectives-editor/perspectives-editor.component';
import { PerspectivesViewerComponent } from './perspectives-viewer/perspectives-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { PerspectivesService } from './perspective.service';
import { ShowToast } from '@nutela/store/shared';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../../constants';
import { Router } from '@angular/router';



@Component({
  selector: 'x365-fm-talent-perspectives',
  templateUrl: './perspectives.component.html',
  styleUrls: ['./perspectives.component.scss'],
  providers: [PerspectivesService],
})
export class PerspectivesComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  perspectiveData$: Observable<IPerspective[]>;

  @ViewChild('editor') editor: PerspectivesEditorComponent;
  @ViewChild('viewer') viewer: PerspectivesViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  dropDownFilterValue: string;
  typeOptions = constants.typeOptions;


  constructor(private store: Store<IAppState>, private router: Router, public service: PerspectivesService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataPerspective());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPerspective));
    this.showViewer$ = this.store.pipe(select(showViewerPerspective));
    this.perspectiveData$ = this.store.pipe(select(getPerspectiveData));
  }

  getRowData$(rowId: number): Observable<IPerspective> {
    return this.perspectiveData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorPerspective());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataPerspective());
    this.store.dispatch(new ShowToast({title: null, message: `Perspectives Information is being refreshed.`, type: ToastTypes.INFO}));
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorPerspective());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPerspective());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPerspective({recordId: rowId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  onSetupRatingsIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.perspectiveRatingSetup}/${rowId}`]);
  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPerspective());
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
