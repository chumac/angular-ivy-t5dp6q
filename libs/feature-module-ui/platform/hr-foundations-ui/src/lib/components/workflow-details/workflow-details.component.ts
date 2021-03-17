import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { IWorkDetails } from '@nutela/models/foundation';
import { AddstepComponent } from '../workflow-definition/addstep/addstep.component';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ShowEditorWorkDetails, IWorkDetailsState, getWorkDetailsData, showEditorWorkDetails, HideEditorWorkDetails, DeleteWorkDetails, showViewerWorkDetails, HideViewerWorkDetails, ShowViewerWorkDetails, isProcessingWorkDetails, ProcessingWorkDetails, LoadWorkDetails, isLoadingWorkDetails, LoadingWorkDetails,} from '../../store/workflow-details';
import { Store, select } from '@ngrx/store';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { WorkflowDetailsViewerComponent } from './workflow-details-viewer/workflow-details-viewer.component';
import { WorkFlowDetailsService } from './workflow-details.service';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { getSendBack } from '../../store/workflow-definition';
import { STANDARD_ROUTES, ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';



@Component({
  selector: 'x365-fm-plf-hrf-workflow-details',
  templateUrl: './workflow-details.component.html',
  styleUrls: ['./workflow-details.component.scss'],
  providers:[WorkFlowDetailsService]
})

export class WorkflowDetailsComponent implements OnInit {
  @Input() public detailsData$:Observable<IWorkDetails[]>;
  @ViewChild('editor') editor: AddstepComponent;
  @ViewChild('viewer') viewer: WorkflowDetailsViewerComponent;
  @Input() public id:number;
  description:string;


  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isProcessing$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  workDetails$:Observable<IWorkDetails[]>;
  backData$:Observable<any>;
  dropDownFilterValue:string;
 @ViewChild('workDetailsGrid') workDetailsGrid: IgxGridComponent;



  constructor(private store: Store<IWorkDetailsState>,
              private dialogBoxService: DialogBoxService,
              public details:WorkFlowDetailsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
   this.storeSelects();
   this.storeDispatches();
  //  console.log('des deta', this.description);
  }


  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorWorkDetails));
    this.showViewer$ = this.store.pipe(select(showViewerWorkDetails));
    this.workDetails$=this.store.pipe(select(getWorkDetailsData));
    this.isLoading$ = this.store.pipe(select(isLoadingWorkDetails));
    this.backData$ = this.store.pipe(select(getSendBack));
    this.backData$.subscribe(res=>{
      this.description=res.description;
    })
 }

 storeDispatches(){
  this.store.dispatch(new LoadingWorkDetails());
  this.id=this.route.snapshot.params.id;
  this.store.dispatch(new LoadWorkDetails({recordId:this.id}));
 }

  onDeleteIconClicked(row_id: number){
    this.dialogBoxService.show(`Are you sure you want to delete your data?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteWorkDetails({recordId: row_id,workID:this.id}));
        }
      });
  }

  onAdd(){
  this.id=this.route.snapshot.params.id;
  this.store.dispatch(new ShowEditorWorkDetails());
  }

  onRefreshedButtonClicked(){
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: ` Data was Refreshed Successfully.`, type: ToastTypes.INFO}));
}

  onEditIconClicked(row_id: number){
    this.editor.data = null;
    this.getRowWorkDetailData$(row_id).pipe(take(1))
    .subscribe((result) => {
      if(result.sendto_type_id===2){
        this.editor.specific_individual=true;
      }
      else if(result.sendto_type_id===3){
        this.editor.specific_position=true;
      }
      else if(result.sendto_type_id===4){
        this.editor.send_to_role=true;
      }
      // else if(result.sendto_type_id===0 || result.sendto_type_id===1){
      //   this.editor.send_to_role=false;
      //   this.editor.specific_individual=false;
      //   this.editor.specific_position=false;
      // }
      this.editor.data = result;
      this.editor.reset();
      this.store.dispatch(new ShowEditorWorkDetails());
    }
    );
  }

  getRowWorkDetailData$(rowId: number): Observable<IWorkDetails> {
    return this.workDetails$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  goBack(){
    // this.router.navigate([`/d/platform/foundation/admin/workflow-definitions`]);
    this.router.navigate([`${STANDARD_ROUTES.workflowDefinition}`])
   }


  onCancelStep(){
    this.store.dispatch(new HideEditorWorkDetails());
  }

  onCancelViewer() {
    this.store.dispatch(new HideViewerWorkDetails());
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowWorkDetailData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerWorkDetails());
        }
      );
  }


  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.workDetailsGrid) {
      if (filterValue) {
        this.workDetailsGrid.clearFilter();
        this.workDetailsGrid.filteringLogic = FilteringLogic.Or;
        this.workDetailsGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.workDetailsGrid.clearFilter();
        this.workDetailsGrid.filteringLogic = FilteringLogic.Or;
        this.workDetailsGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
