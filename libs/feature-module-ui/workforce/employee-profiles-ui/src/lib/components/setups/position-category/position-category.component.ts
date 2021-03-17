import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PositionCategoryService } from './position-category.service';
import { IPositionCategorySetup } from '@nutela/models/workforce/employee-profiles';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IgxGridComponent } from 'igniteui-angular';
import { UtilService } from '@nutela/core-services';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { IEmployeesProfileState } from '../../../store/root';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { LoadingPositionCategorySetup, LoadDataPositionCategorySetup, getPositionCategorySetupData, showEditorPositionCategorySetup, isProcessingPositionCategorySetup, isLoadingPositionCategorySetup, ShowEditorPositionCategorySetup, HideEditorPositionCategorySetup, DeleteDataPositionCategorySetup } from '../../../store/setups/position-category';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { PositionCategoryEditorComponent } from './position-category-editor/position-category-editor.component';

@Component({
  selector: 'x365-fm-workforce-position-category',
  templateUrl: './position-category.component.html',
  styleUrls: ['./position-category.component.scss'],
  providers: [PositionCategoryService]
})

export class PositionCategoryComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  isLoading$ :Observable<boolean>;

  public data: any[];

  public positionCategoryData$: Observable<IPositionCategorySetup[]>;
  @ViewChild('editor') editor: PositionCategoryEditorComponent;

  @ViewChild('filterBy') filterBy: SelectComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild("positionCategoryGrid") positionCategoryGrid: IgxGridComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public service: PositionCategoryService,
    private store: Store<IEmployeesProfileState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Position Category Setup '}${this.partialDocumentTitle}`)
  }
  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataPositionCategorySetup());
    this.store.dispatch(new LoadingPositionCategorySetup());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPositionCategorySetup));
    this.positionCategoryData$ = this.store.pipe(select(getPositionCategorySetupData));
    this.isProcessing$=this.store.pipe(select(isProcessingPositionCategorySetup));
    this.isLoading$ = this.store.pipe(select(isLoadingPositionCategorySetup));
  }

  getPositionCategoryData$(rowId: number): Observable<IPositionCategorySetup> {
    console.log('data row', rowId);
    return this.positionCategoryData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }



  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getPositionCategoryData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorPositionCategorySetup());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPositionCategorySetup({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorPositionCategorySetup());
  }

  search() {
    let filterBy: string = '';
    const searchString = this.searchInput.nativeElement.value;

    if (this.filterBy) {
      filterBy = <string>this.filterBy.value;
    }

    if (this.positionCategoryGrid) {
      this.service.search(this.positionCategoryGrid, searchString, filterBy);
    }
  }

  onAdd(){
    this.store.dispatch(new ShowEditorPositionCategorySetup());
  }

  onRefresh(){
    this.store.dispatch(new LoadDataPositionCategorySetup());
    this.store.dispatch(new ShowToast({title: null, message: `Position Category data was refresh successfully.`, type: ToastTypes.SUCCESS}),)
  }

}
