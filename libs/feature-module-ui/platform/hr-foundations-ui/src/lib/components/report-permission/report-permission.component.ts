import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IReport, IStandardReport } from '@nutela/models/foundation';
import { Store, select } from '@ngrx/store';
import { IHRFoundationState } from '../../store/root';
import {  ShowEditorReport, ProcessingReport,
         DeleteReport,
         getStandardReport, getReportPermission,
         LoadReportPermission, LoadStandardReport, showEditorReport, HideEditorReport, isLoadingReport, LoadingReport } from '../../store/report';
import { DialogBoxCommandTypes, DialogBoxService } from '@nutela/shared/ui';
import { map, take } from 'rxjs/operators';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ReportService } from './report.service';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { ReportPermissionEditorComponent } from './report-permission-editor/report-permission-editor.component';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';
import { SelectComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'x365-fm-plf-hrf-report-permission',
  templateUrl: './report-permission.component.html',
  styleUrls: ['./report-permission.component.scss'],
  providers: [ReportService],
})
export class ReportPermissionComponent implements OnInit {
  @ViewChild('StandardGrid') StandardGrid: IgxGridComponent;
  @ViewChild('PermissionGrid') PermissionGrid: IgxGridComponent;
  @ViewChild('reportEditor') reportEditor: ReportPermissionEditorComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;
 public data: IStandardReport[];

 standardReport$: Observable<IReport[]>;
 reportPermission$: Observable<IReport[]>;
 isLoading$: Observable<boolean>;
 showEditor$: Observable<boolean>;
 dropDownFilterValue:string;


constructor(
  @Inject('partialDocumentTitle') private partialDocumentTitle: string,
  private utilService: UtilService,
  private titleService: Title,
  public reportService: ReportService,
  private store: Store<IHRFoundationState>,
  private dialogBoxService: DialogBoxService,
) {
  titleService.setTitle(`${'Report Permission'}${this.partialDocumentTitle}`)
}

 ngOnInit() {
   this.storeSelects();
   this.storeDispatches();

 }

 storeSelects() {
   this.standardReport$ = this.store.pipe(select(getStandardReport));
   this.reportPermission$ = this.store.pipe(select(getReportPermission));
   this.isLoading$ = this.store.pipe(select(isLoadingReport));
   this.showEditor$ = this.store.pipe(select(showEditorReport));
 }

 storeDispatches() {
   this.store.dispatch(new LoadingReport());
  this.store.dispatch(new LoadStandardReport());
  this.store.dispatch(new LoadReportPermission());
 }

   getReportPermission$(rowId: number): Observable<IReport>{
     return this.reportPermission$.pipe(
       map(d => d.filter(v => v.id === rowId)),
       map(e => e.shift()))
   }

   getStandardReport$(rowId: number): Observable<IReport[]>{
    console.log('data processed row', rowId);
    return this.standardReport$.pipe(
      map(d => d.filter(v => v.id === rowId)));
  }

  onDeleteIconClicked(rowId: number) {
   this.dialogBoxService.show(`Are you sure you want to delete this?`)
     .subscribe((command: string) => {
       if (command === DialogBoxCommandTypes.COMMAND1) {
         this.store.dispatch(new LoadingReport());
         this.store.dispatch(new DeleteReport({ReportId: rowId}));
       }
     });
 }

 onRefreshedButtonClicked() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Report data was Refreshed Successfully.`, type: ToastTypes.INFO}));
}

onGrant(){
  const selectedItems = this.StandardGrid.selectedRows();
  if (selectedItems.length === 0) {
    this.store.dispatch(new ShowToast({title: null, message: `Please, select items from the list.`, type: ToastTypes.INFO}));
  }
  else {
      this.reportEditor.data = selectedItems;
      this.store.dispatch(new ShowEditorReport());
  }
}

onGrantIcon(rowId: number){
  this.reportEditor.data=null;
  this.getStandardReport$(rowId).pipe(take(1)).
  subscribe((result) => {
    this.reportEditor.data = result;
    this.store.dispatch(new ShowEditorReport());
  });
}

onWorkCompleted() {
  this.deselectGridRows();
}

deselectGridRows() {
  if (this.StandardGrid) {
    this.StandardGrid.deselectAllRows();
  }
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

    if (this.StandardGrid) {
      this.reportService.search(
        this.StandardGrid,
        searchString,
        filterBy
      );
    } else if (this.PermissionGrid) {
      this.reportService.search(
        this.PermissionGrid,
        searchString,
        filterBy
      );
    }
  }

onFilterListSelected(data) {
  this.dropDownFilterValue = data.value;
}

filter(term: string, filterValue: string) {
  if (this.StandardGrid) {
    if (filterValue) {
      this.StandardGrid.clearFilter();
      this.StandardGrid.filteringLogic = FilteringLogic.Or;
      this.StandardGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    } else {
      this.StandardGrid.clearFilter();
      this.StandardGrid.filteringLogic = FilteringLogic.Or;
      this.StandardGrid.filterGlobal(
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
  else if(this.PermissionGrid){
    if (filterValue) {
      this.PermissionGrid.clearFilter();
      this.PermissionGrid.filteringLogic = FilteringLogic.Or;
      this.PermissionGrid.filter(
        filterValue,
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    } else {
      this.PermissionGrid.clearFilter();
      this.PermissionGrid.filteringLogic = FilteringLogic.Or;
      this.PermissionGrid.filterGlobal(
        term,
        IgxStringFilteringOperand.instance().condition('contains'),
        false
      );
    }
  }
}

onCancelEditor(){
  this.store.dispatch(new HideEditorReport());
}
}
