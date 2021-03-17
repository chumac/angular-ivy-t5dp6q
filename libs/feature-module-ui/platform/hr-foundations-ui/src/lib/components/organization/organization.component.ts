import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getOrganizationApprovedData, LoadApprovedDataOrganization, ShowEditorOrganization, HideEditorOrganization, showEditorOrganization, isProcessingOrganization, ProcessingOrganization, } from '../../store/organization';
import { Observable } from 'rxjs';
import { IOrganization } from '@nutela/models/foundation';
import { map } from 'rxjs/internal/operators/map';
import { OrganizationEditorComponent } from './organization-editor/organization-editor.component';
import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { IHRFoundationState } from '../../store/root'
import { HrzCommandTypes} from '@nutela/shared/ui';
import { take } from 'rxjs/operators';
import { OrganizationService } from './organization.service';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { UtilService } from '@nutela/core-services';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'x365-fm-plf-hrf-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  providers:[OrganizationService],
})
export class OrganizationComponent implements OnInit {

  dropDownFilterValue:string;
  @ViewChild('organizationGrid') organizationGrid: IgxGridComponent;
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  public organizationData$: Observable<IOrganization[]>;

  @ViewChild('editor') editor: OrganizationEditorComponent;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public org:OrganizationService,
    private store: Store<IHRFoundationState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Organization'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadApprovedDataOrganization());
    // this.store.dispatch(new ProcessingOrganization());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorOrganization));
    this.selectOptionData$ = this.store.pipe(select(getSelectOptionData));
    this.organizationData$ = this.store.pipe(select(getOrganizationApprovedData));
    this.isProcessing$=this.store.pipe(select(isProcessingOrganization));
  }

  showEditor() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorOrganization());
  }

  getRowOrganizationData$(rowId: number): Observable<IOrganization> {
    console.log('data row', rowId);
    return this.organizationData$.pipe(
      map(d => d.filter(v => v.org_id === rowId)),
      map(e => e.shift()))
  }

  onButtonClicked($event) {
    switch ($event) {
      case HrzCommandTypes.REFRESH: {
       this.refresh()
       this.store.dispatch(new ShowToast({title: null, message: ` Organization data is being refreshed.`, type: ToastTypes.INFO}));
        break;
      }
      default:
        break;
     }
  }


  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowOrganizationData$(row_id).pipe(take(1))
      .subscribe((result) => {
        this.editor.data = result;
        this.editor.reset();
        this.store.dispatch(new ShowEditorOrganization());
      }
      );
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorOrganization());
  }

  refresh(){
    this.store.dispatch(new LoadApprovedDataOrganization());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.organizationGrid) {
      if (filterValue) {
        this.organizationGrid.clearFilter();
        this.organizationGrid.filteringLogic = FilteringLogic.Or;
        this.organizationGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.organizationGrid.clearFilter();
        this.organizationGrid.filteringLogic = FilteringLogic.Or;
        this.organizationGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
