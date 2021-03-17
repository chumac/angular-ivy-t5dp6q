import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { map, take } from 'rxjs/operators';
import { CustomUserGroupSetupsEditorComponent } from './custom-user-group-setups-editor/custom-user-group-setups-editor.component';
import { CustomUserGroupSetupsViewerComponent } from './custom-user-group-setups-viewer/custom-user-group-setups-viewer.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getActivePersonnelHR } from '@nutela/store/modules/foundation';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ShowToast } from '@nutela/store/shared';
import { toastOptionsInformation, UtilService } from '@nutela/core-services';
import { SwitchComponent } from '@nutela/shared/ui';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import { ToastTypes } from '@nutela/shared/app-global';
import * as constants from '../../../constants'
import { showEditorCustomUserGroupSetup, showViewerCustomUserGroupSetup, isProcessingCustomUserGroupSetup, getDataCustomUserGroupSetup, LoadDataCustomUserGroupSetup, ShowEditorCustomUserGroupSetup, HideEditorCustomUserGroupSetup, DeleteDataCustomUserGroupSetup, HideViewerCustomUserGroupSetup, ShowViewerCustomUserGroupSetup } from '../../../store/setups/custom-user-group';
import { ICustomUserGroupSetup } from '@nutela/models/workforce/employee-profiles';
import { ISelectOption } from '@nutela/models/core-data';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { CustomUserGroupSetupService } from './custom-user-group-setups.service';

@Component({
  selector: 'x365-fm-workforce-custom-user-group-setups',
  templateUrl: './custom-user-group-setups.component.html',
  styleUrls: ['./custom-user-group-setups.component.scss'],
  providers: [CustomUserGroupSetupService]

})
export class CustomUserGroupSetupsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;


  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  data$: Observable<ICustomUserGroupSetup[]>;

  @ViewChild('editor') editor: CustomUserGroupSetupsEditorComponent;
  @ViewChild('viewer') viewer: CustomUserGroupSetupsViewerComponent;
  @ViewChild('dataGrid') dataGrid: IgxGridComponent;
  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;


  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title,
    public service: CustomUserGroupSetupService,
    private store: Store<IAppState>, 
    private dialogBoxService: DialogBoxService, 
    public utilService: UtilService,) {
      titleService.setTitle(`${'Staff Group Setups'}${this.partialDocumentTitle}`)
    }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorCustomUserGroupSetup));
    this.showViewer$ = this.store.pipe(select(showViewerCustomUserGroupSetup));
    this.isProcessing$ = this.store.pipe(select(isProcessingCustomUserGroupSetup));
    this.data$ = this.store.pipe(select(getDataCustomUserGroupSetup));
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataCustomUserGroupSetup());
  }

  getRowData$(rowId: number): Observable<ICustomUserGroupSetup> {
    return this.data$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onApplyBtnClicked() {
    this.editor.data = null;
    this.editor.reset();
    this.store.dispatch(new ShowEditorCustomUserGroupSetup());
  }

  onRefreshBtnClicked() {
    this.store.dispatch(new LoadDataCustomUserGroupSetup());
    this.store.dispatch(new ShowToast({title: null, message: `Custom user group setup Information is being refreshed.`, type: ToastTypes.INFO}));

  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerCustomUserGroupSetup());
        }
      );
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorCustomUserGroupSetup());
        }
      );
  }

  onDeleteIconClicked(id: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new DeleteDataCustomUserGroupSetup({recordId: id}));
      }
    });
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.dataGrid) {
      this.service.search(this.dataGrid, searchString, filterBy);
    }
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorCustomUserGroupSetup());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerCustomUserGroupSetup());
  }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

