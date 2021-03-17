import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPerspectiveRating } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorPerspectiveRating, showViewerPerspectiveRating, getPerspectiveRatingData, LoadDataPerspectiveRating, ShowEditorPerspectiveRating, HideEditorPerspectiveRating, DeleteDataPerspectiveRating, ShowViewerPerspectiveRating, ProcessingPerspectiveRating, UploadDataPerspectiveRating } from '../../../store/setups';
import { PerspectiveRatingsEditorComponent } from './perspective-ratings-editor/perspective-ratings-editor.component';
import { PerspectiveRatingsViewerComponent } from './perspective-ratings-viewer/perspective-ratings-viewer.component';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { PersepectiveRatingsService } from './persepective-ratings.service';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import * as XLSX from 'xlsx';
import { toastOptionsError } from '@nutela/core-services';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'x365-fm-talent-perspective-ratings',
  templateUrl: './perspective-ratings.component.html',
  styleUrls: ['./perspective-ratings.component.scss'], 
  providers: [PersepectiveRatingsService],
})
export class PerspectiveRatingsComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  perspectiveRatingData$: Observable<IPerspectiveRating[]>;

  @ViewChild('editor') editor: PerspectiveRatingsEditorComponent;
  @ViewChild('viewer') viewer: PerspectiveRatingsViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;
  dropDownFilterValue: string;
  currPerspectiveId: number = +this.route.snapshot.paramMap.get('id');


  constructor(private store: Store<IAppState>, private location: Location, private route: ActivatedRoute, public service: PersepectiveRatingsService, private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataPerspectiveRating({persepectiveId: this.currPerspectiveId}));
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPerspectiveRating));
    this.showViewer$ = this.store.pipe(select(showViewerPerspectiveRating));
    this.perspectiveRatingData$ = this.store.pipe(select(getPerspectiveRatingData));
  }

  getRowData$(rowId: number): Observable<IPerspectiveRating> {
    return this.perspectiveRatingData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onUploadButtonClicked() {

  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    let ext = (target.files[0].name.match(/\.([^.]*?)(?=\?|#|$)/) || [])[1]; 
    if(ext.trim() === 'xlsx'){

      if (target.files.length !== 1){
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'Cannot use multiple files', options: toastOptionsError()}))
      } 
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => { 
        const resFilename = target.files[0].name;
  
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
  
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
        const data = <IPerspectiveRating[]>(XLSX.utils.sheet_to_json(ws));
        this.store.dispatch(new ProcessingPerspectiveRating());
        this.store.dispatch(new UploadDataPerspectiveRating({objectiveData: data}));
      };
      reader.readAsBinaryString(target.files[0]);

    } else {
        this.store.dispatch(new ShowToast({title: 'Correct the following Errors', message: 'File Format not supported', options: toastOptionsError()}))
    }
    
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.editor.perspectiveId = this.currPerspectiveId;
    this.store.dispatch(new ShowEditorPerspectiveRating());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataPerspectiveRating({persepectiveId: this.currPerspectiveId}));     
    this.store.dispatch(new ShowToast({title: null, message: `Perspective Ratings Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.editor.perspectiveId = this.currPerspectiveId;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.eligibiltyRule = result.eligibility_rule;
          this.editor.reset();
          this.store.dispatch(new ShowEditorPerspectiveRating());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPerspectiveRating());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPerspectiveRating({recordId: rowId, persepectiveId: this.currPerspectiveId}));
        }
      });
  }

  onDownloadIconClicked(rowId: number) {

  }

  hasDocumentApproved(rowId: number):boolean {
    return false;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPerspectiveRating());
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

  // transformGrid() {
  //   this.perspectiveRatingData$.pipe(
  //     map(res => res.map(data => Object.assign({}, data, {
  //       perspective_description: data.PerspectivesInfo.description,
  //     })))
  //   ).subscribe(x => console.log('new data: ', x));
  // }

  unsubscribe() {
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


}
