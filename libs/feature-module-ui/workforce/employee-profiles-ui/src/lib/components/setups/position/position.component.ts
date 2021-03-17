import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { PositionService } from './position.service';
import { Observable } from 'rxjs';
import { IPositionSetup } from '@nutela/models/workforce/employee-profiles';
import { SelectComponent} from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { Title } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';
import { IEmployeesProfileState } from '../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorPositionSetup, LoadingPositionSetup, getApprovedPositionSetupData,
         getAwaitingPositionSetupData, isProcessingPositionSetup, isLoadingPositionSetup,
         LoadApprovedDataPositionSetup, LoadAwaitingDataPositionSetup, ShowEditorPositionSetup,
         DeleteDataPositionSetup, HideEditorPositionSetup, LoadSpecificTypePosition, LoadGradeListPosition, LoadPositionListPosition, LoadPositionCategoryPosition, HideViewerPositionSetup, showViewerPositionSetup, ShowViewerPositionSetup } from '../../../store/setups/position';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { UtilService } from '@nutela/core-services';
import { PositionEditorComponent } from './position-editor/position-editor.component';
import { PositionViewerComponent } from './position-viewer/position-viewer.component';

@Component({
  selector: 'x365-fm-workforce-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [PositionService]
})
export class PositionComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$ :Observable<boolean>;

  public data: any[];

  public approvedPositionData$: Observable<IPositionSetup[]>;
  public awaitingPositionData$: Observable<IPositionSetup[]>;
  @ViewChild('editor') editor: PositionEditorComponent;
  @ViewChild('viewer') viewer: PositionViewerComponent;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("approvedPositionGrid") approvedPositionGrid: IgxGridComponent;
  @ViewChild("awaitingPositionGrid") awaitingPositionGrid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: PositionService,
    private store: Store<IEmployeesProfileState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Position Setup '}${this.partialDocumentTitle}`)
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataPositionSetup());
    this.store.dispatch(new LoadAwaitingDataPositionSetup());
    this.store.dispatch(new LoadingPositionSetup());
    this.store.dispatch(new LoadSpecificTypePosition());
    this.store.dispatch(new LoadGradeListPosition());
    this.store.dispatch(new LoadPositionListPosition());
    this.store.dispatch(new LoadPositionCategoryPosition());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPositionSetup));
    this.showViewer$ = this.store.pipe(select(showViewerPositionSetup));
    this.approvedPositionData$ = this.store.pipe(select(getApprovedPositionSetupData));
    this.awaitingPositionData$ = this.store.pipe(select(getAwaitingPositionSetupData));
    this.isProcessing$=this.store.pipe(select(isProcessingPositionSetup));
    this.isLoading$ = this.store.pipe(select(isLoadingPositionSetup));
  }

  getApprovedPositionData$(rowId: number): Observable<IPositionSetup> {
    console.log('data row', rowId);
    return this.approvedPositionData$.pipe(
      map(d => d.filter(v => v.position_id === rowId)),
      map(e => e.shift()))
  }

  getAwaitingPositionData$(rowId: number): Observable<IPositionSetup> {
    console.log('data row', rowId);
    return this.awaitingPositionData$.pipe(
      map(d => d.filter(v => v.position_id === rowId)),
      map(e => e.shift()))
  }

  onApprovedPositionViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getApprovedPositionData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          console.log('result',result);
          this.store.dispatch(new ShowViewerPositionSetup());
        }
      );
  }

  onAwaitingPositionViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getAwaitingPositionData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPositionSetup());
        }
      );
  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getApprovedPositionData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorPositionSetup());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPositionSetup({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorPositionSetup());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerPositionSetup());
  }


  search() {
    let filterBy: string = '';
    let searchString:string='';
    if(this.searchInput){
      searchString = this.searchInput.nativeElement.value;
     }

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.approvedPositionGrid) {
      this.service.search(this.approvedPositionGrid, searchString, filterBy);
    }

    if (this.awaitingPositionGrid) {
      this.service.search(this.awaitingPositionGrid, searchString, filterBy);
    }
  }

  onAdd(){
    this.store.dispatch(new ShowEditorPositionSetup());
  }

  onRefresh(){
    this.store.dispatch(new LoadApprovedDataPositionSetup());
    this.store.dispatch(new LoadAwaitingDataPositionSetup());
    this.store.dispatch(new ShowToast({title: null, message: `Position data was refresh successfully.`, type: ToastTypes.SUCCESS}),)
  }

}
