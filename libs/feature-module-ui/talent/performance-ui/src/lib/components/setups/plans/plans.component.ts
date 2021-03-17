import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@nutela/store/app-state';
import { Observable } from 'rxjs/internal/Observable';
import { IPlan } from '@nutela/models/talent/performance';
import { map, take } from 'rxjs/operators';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { showEditorPlan, showViewerPlan, getPlanData, LoadDataPlan, ShowEditorPlan, HideEditorPlan, DeleteDataPlan, ShowViewerPlan, ClosePlan, PublishPlan } from '../../../store/setups/plan';
import { PlansEditorComponent } from './plans-editor/plans-editor.component';
import { PlansViewerComponent } from './plans-viewer/plans-viewer.component';
import { PlansService } from './plans.service';
import { IgxGridComponent, FilteringLogic, IgxStringFilteringOperand } from 'igniteui-angular';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes, STANDARD_ROUTES } from '@nutela/shared/app-global';
import { HRInitiateFeedbackForm } from '../../../store/reviews/feedback-form';
import { Router } from '@angular/router';


@Component({
  selector: 'x365-fm-talent-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
  providers: [PlansService],
})
export class PlansComponent implements OnInit {
  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  planData$: Observable<IPlan[]>;
  dropDownFilterValue: string;

  @ViewChild('editor') editor: PlansEditorComponent;
  @ViewChild('viewer') viewer: PlansViewerComponent;
  @ViewChild('grid') grid: IgxGridComponent;


  constructor(private store: Store<IAppState>, private router: Router, public service: PlansService,  private dialogBoxService: DialogBoxService) {}

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeDispatches() {
    this.store.dispatch(new LoadDataPlan());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorPlan));
    this.showViewer$ = this.store.pipe(select(showViewerPlan));
    this.planData$ = this.store.pipe(select(getPlanData));
  }

  getRowData$(rowId: number): Observable<IPlan> {
    return this.planData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }

  onAddButtonClicked(){
    this.editor.data = null;
    this.store.dispatch(new ShowEditorPlan());
  }

  onRefreshButtonClicked(){
    this.store.dispatch(new LoadDataPlan());
    this.store.dispatch(new ShowToast({title: null, message: `Plans Information is being refreshed.`, type: ToastTypes.INFO}));
  }
  
  onEditIconClicked(rowId: number) {
    this.editor.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.editor.data = result;
          this.editor.reset();
          this.store.dispatch(new ShowEditorPlan());
        }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          this.viewer.data = result;
          this.store.dispatch(new ShowViewerPlan());
        }
      );
  }

  onDeleteIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to delete your data?`).pipe(take(1))
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteDataPlan({recordId: rowId}));
        }
      });
  }

  onClosePlanIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to close this plan?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new ClosePlan(rowId));
      }
    });
  }

  onPublishIconClicked(rowId: number) {
    this.dialogBoxService.show(`Are you sure you want to publish this plan?`).pipe(take(1))
    .subscribe((command: string) => {
      if (command === DialogBoxCommandTypes.COMMAND1) {
        this.store.dispatch(new PublishPlan(rowId));
      }
    });
  }

  onInitiateFeedbackIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.feedbackSessionSetup}/${rowId}`]);
  }

  onSetupOptionsIconClicked(rowId: number) {
    this.router.navigate([`${STANDARD_ROUTES.planOptionSetup}/${rowId}`]);
  }


  isPublished(rowId: number):boolean {
    let status = false;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.is_published === true) {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  isClosed(rowId: number):boolean {
    let status = false;

    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
          if (result.closed_by !== '') {
            status = true;
          } else {
            status = false;
          }
        }
      );

    return status;
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorPlan());
  }

  onCancelViewer() {}

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

  unsubscribe() {}

  ngOnDestroy() {
    this.unsubscribe();
  }


}
