import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ISecurity } from '@nutela/models/foundation';
import { map, take } from 'rxjs/operators'

import { DialogBoxService, DialogBoxCommandTypes, HrzCommandTypes } from '@nutela/shared/ui';
import { IHRFoundationState } from '../../store/root';
import { showEditorSecurity, getProcessedSecurityData, getWaitingSecurityData,
         LoadProcessedSecurity, LoadWaitingSecurity, HideEditorSecurity,
         ShowEditorSecurity, DeleteSecurity, showViewerSecurity,
  HideViewerSecurity, ShowViewerSecurity, isLoadingSecurity, LoadingSecurity, showBulkEditorSecurity, HideBulkEditorSecurity, ShowBulkEditorSecurity } from '../../store/security';
import { SecurityEditorComponent } from './security-editor/security-editor.component';
import { SecurityViewerComponent } from './security-viewer/security-viewer.component';
import { SecurityService } from './security.service';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { Router } from '@angular/router';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';
import { BulkSecurityEditorComponent } from './bulk-security-editor/bulk-security-editor.component';


@Component({
  selector: 'x365-fm-plf-hrf-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  providers:[SecurityService]
})
export class SecurityComponent implements OnInit {
   @ViewChild('editor') editor: SecurityEditorComponent;
   @ViewChild('bulkEditor') bulkEditor: BulkSecurityEditorComponent;
   @ViewChild('viewer') viewer: SecurityViewerComponent;
   @ViewChild('ProcessedGrid') ProcessedGrid: IgxGridComponent;
  @ViewChild('WaitingGrid') WaitingGrid: IgxGridComponent;

  showEditor$: Observable<boolean>;
  showBulkEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$:Observable<boolean>;
  public data: any[];

  processedData$: Observable<ISecurity[]>;
  waitingData$: Observable<ISecurity[]>;
  dropDownFilterValue:string;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    private router:Router,
    public securityService:SecurityService,
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
    this.showEditor$ = this.store.pipe(select(showEditorSecurity));
    this.showBulkEditor$ = this.store.pipe(select(showBulkEditorSecurity));
    this.showViewer$ = this.store.pipe(select(showViewerSecurity));
    this.isLoading$= this.store.pipe(select(isLoadingSecurity));

    this.processedData$ = this.store.pipe(select(getProcessedSecurityData));
    this.waitingData$ = this.store.pipe(select(getWaitingSecurityData));
  }

onAdd(){
  this.store.dispatch(new ShowEditorSecurity());
}

onRefresh(){
  this.storeDispatches();
  this.store.dispatch(new ShowToast({title: null, message: `data was refreshed Successfully.`, type: ToastTypes.INFO}));
 }

  onCancelEditor() {
    this.store.dispatch(new HideEditorSecurity());
    this.store.dispatch(new HideBulkEditorSecurity());
  }

  storeDispatches() {
    this.store.dispatch(new LoadProcessedSecurity());
    this.store.dispatch(new LoadWaitingSecurity());
    this.store.dispatch(new LoadingSecurity());
    }

  getWaitingRowData$(rowId: number): Observable<ISecurity> {
    console.log('data waiting row', rowId);
    return this.waitingData$.pipe(
      map(d => d.filter(v => v.action_id===rowId)),
      map(e => e.shift()))
    }

    getProcessedData$(rowId: number): Observable<ISecurity>{
      console.log('data processed row', rowId);
      return this.processedData$.pipe(
        map(d => d.filter(v => v.action_id===rowId)),
        map(e => e.shift()))
    }

  onDeleteIconClicked(key:string){
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteSecurity({SecurityKey: key}));
        }
      });
  }
  onProcessedViewedClicked(row_id:number){
    this.viewer.data = null;
    this.getProcessedData$(row_id).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerSecurity());
        }
      );
  }

  onWaitingViewedClicked(row_id:number){
    this.viewer.data = null;
    this.getWaitingRowData$(row_id).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerSecurity());
        }
      );
  }
  onAdvance(){
  // this.router.navigate([STANDARD_ROUTES.advancedSecurity]);
    this.store.dispatch(new ShowBulkEditorSecurity());

  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerSecurity());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.ProcessedGrid) {
      if (filterValue) {
        this.ProcessedGrid.clearFilter();
        this.ProcessedGrid.filteringLogic = FilteringLogic.Or;
        this.ProcessedGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.ProcessedGrid.clearFilter();
        this.ProcessedGrid.filteringLogic = FilteringLogic.Or;
        this.ProcessedGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
    else if(this.WaitingGrid){
      if (filterValue) {
        this.WaitingGrid.clearFilter();
        this.WaitingGrid.filteringLogic = FilteringLogic.Or;
        this.WaitingGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.WaitingGrid.clearFilter();
        this.WaitingGrid.filteringLogic = FilteringLogic.Or;
        this.WaitingGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}

















