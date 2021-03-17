import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { IgxGridComponent } from 'igniteui-angular';
import { Store, select } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { map, take } from 'rxjs/operators';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { PayrollIntegrationService } from './payroll-integration.service';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { IRootState } from '../../../store/root/root.state';
import { IPayrollIntegration } from '@nutela/models/compensation/payment';
import { PayrollIntegrationEditorComponent } from './payroll-integration-editor/payroll-integration-editor.component';
import { PayrollIntegrationViewerComponent } from './payroll-integration-viewer/payroll-integration-viewer.component';
import { isLoadingPayrollIntegration, showEditorPayrollIntegration, showViewerPayrollIntegration, getPayrollIntegrationData, LoadingPayrollIntegration, LoadPayrollIntegrationData, ShowEditorPayrollIntegration, ShowViewerPayrollIntegration, HideEditorPayrollIntegration, HideViewerPayrollIntegration } from '../../../store/execution/payroll-integration';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscriptions } from '@nutela/models/common';

@Component({
  selector: 'x365-fm-payrl-payroll-integration',
  templateUrl: './payroll-integration.component.html',
  styleUrls: ['./payroll-integration.component.scss'],
  providers: [PayrollIntegrationService]
})
export class PayrollIntegrationComponent implements OnInit {

  dropDownFilterValue: string;
  employee_id: number;
  subscribe: any;
  payrollProfileId: number;

  showEditor$: Observable<boolean>;
  showViewer$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  integrationData$: Observable<IPayrollIntegration[]>;

  private subscriptions: ISubscriptions = {};

  @ViewChild("grid") grid: IgxGridComponent;
  @ViewChild("editor") editor: PayrollIntegrationEditorComponent;
  @ViewChild("viewer") viewer: PayrollIntegrationViewerComponent;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('filterBy') filterBy: SelectComponent;


  constructor(@Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private titleService: Title, public service: PayrollIntegrationService, private store: Store<IRootState>, private router: Router, private route: ActivatedRoute, private location: Location) {
    titleService.setTitle(
      `${'Payroll Integration Process'}${this.partialDocumentTitle}`
    );
    this.assignProfileId();
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  assignProfileId() {
    this.route.params.pipe(take(1)).subscribe(v => {
      this.payrollProfileId = parseInt(v.profileID);
    });
  }
  storeSelects() {
    this.isLoading$ = this.store.pipe(select(isLoadingPayrollIntegration));
    this.showEditor$ = this.store.pipe(select(showEditorPayrollIntegration));
    this.showViewer$ = this.store.pipe(select(showViewerPayrollIntegration));
    this.integrationData$ = this.store.pipe(select(getPayrollIntegrationData));
  }

  storeDispatches() {
    this.store.dispatch(new LoadingPayrollIntegration());
    this.store.dispatch(new LoadPayrollIntegrationData({payrollProfileId: this.payrollProfileId}));
  }


  getRowData$(rowId: number): Observable<IPayrollIntegration> {
    return this.integrationData$.pipe(
      map(d => d.filter(v => v.id === rowId)),
      map(e => e.shift()))
  }


  onRefresh() {
    this.storeDispatches();
    this.store.dispatch(new ShowToast({title: null, message: `Data is being refreshed.`, type: ToastTypes.INFO}));
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

    if (this.grid) {
      this.service.search(
        this.grid,
        searchString,
        filterBy
      );
    }
  }
  goBack() {
    this.location.back();
  }
  onAdd() {
    this.editor.selectedProfile = this.payrollProfileId;
    this.store.dispatch(new ShowEditorPayrollIntegration());
  }

  onEditIconClicked(rowId: number) {
    this.editor.data = null;
    this.getRowData$(rowId).pipe(take(1))
    .subscribe((result) => {
      this.editor.data = result;
      this.editor.reset();
        this.editor.selectedProfile = this.payrollProfileId;
        this.store.dispatch(new ShowEditorPayrollIntegration());
      }
      );
  }

  onViewIconClicked(rowId: number) {
    this.viewer.data = null;
    this.getRowData$(rowId).pipe(take(1))
      .subscribe((result) => {
        this.viewer.data = result;
        this.store.dispatch(new ShowViewerPayrollIntegration());
      }
      );
  }


  onCancelEditor() {
    this.editor.data = null;
    this.store.dispatch(new HideEditorPayrollIntegration());
  }

  onCancelViewer() {
    this.editor.data = null;
    this.store.dispatch(new HideViewerPayrollIntegration());
  }

  unsubscribe() {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }

  ngOnDestroy() {
    this.unsubscribe();

  }
}
