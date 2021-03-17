import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IOptions } from '@nutela/models/foundation';
import { map, take } from 'rxjs/operators'


import { DialogBoxService, DialogBoxCommandTypes, HrzCommandTypes } from '@nutela/shared/ui';
import { showEditorOptions, getCustomOptionsData, getGlobalOptionsData, isProcessingOption } from '../../store/option/option.selectors';
import {
  ShowEditorOption, HideEditorOption, LoadCustomOption,
  LoadGlobalOption, DeleteOption, ProcessingOption
} from '../../store/option/option.actions';
import { CustomOptionsEditorComponent } from './custom-options-editor/custom-options-editor.component';
import { IHRFoundationState } from '../../store/root';
import {
  IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand
} from 'igniteui-angular';
import { OptionsService } from './options.service';
import { ToastTypes } from '@nutela/shared/app-global';
import { ShowToast } from '@nutela/store/shared';
import { Title } from '@angular/platform-browser';
import { UtilService } from '@nutela/core-services';



@Component({
  selector: 'x365-fm-plf-hrf-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  providers: [OptionsService],
})
export class OptionsComponent implements OnInit {
  @ViewChild('editor') editor: CustomOptionsEditorComponent;
  @ViewChild('globalGrid') globalGrid: IgxGridComponent;
  @ViewChild('customGrid') customGrid: IgxGridComponent;
  dropDownFilterValue: string;


  showEditor$: Observable<boolean>;
  public data: any[];
  custom = "CUSTOM";
  global = "GLOBAL";


  customApprovedData$: Observable<IOptions[]>;
  globalApprovedData$: Observable<IOptions[]>;
  isProcessing$: Observable<boolean>;

  constructor(
    @Inject('partialDocumentTitle') private partialDocumentTitle: string,
    private utilService: UtilService,
    private titleService: Title,
    public options: OptionsService,
    private store: Store<IHRFoundationState>,
    private dialogBoxService: DialogBoxService,
  ) {
    titleService.setTitle(`${'Options'}${this.partialDocumentTitle}`)
  }

  ngOnInit() {
    this.storeDispatches();
    this.storeSelects();
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorOptions));

    this.customApprovedData$ = this.store.pipe(select(getCustomOptionsData));
    this.globalApprovedData$ = this.store.pipe(select(getGlobalOptionsData));
    this.isProcessing$ = this.store.pipe(select(isProcessingOption));
  }


  onButtonClicked($event) {
    switch ($event) {
      case HrzCommandTypes.REFRESH: {
        this.storeDispatches();
        this.store.dispatch(new ShowToast({title: null, message: ` data is being refreshed.`, type: ToastTypes.INFO}));
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.editor.data = null;
    this.store.dispatch(new ShowEditorOption());
  }


  onCancelEditor() {
    this.store.dispatch(new HideEditorOption());
  }

  storeDispatches() {
    this.store.dispatch(new LoadCustomOption());
    this.store.dispatch(new LoadGlobalOption());
    // this.store.dispatch(new ProcessingOption());
  }

  getGlobalRowOptionsData$(rowId: string): Observable<IOptions> {
    console.log('data global row', rowId);
    return this.globalApprovedData$.pipe(
      map(d => d.filter(v => v.option_key === rowId)),
      map(e => e.shift()))
  }

  getCustomRowOptionsData$(rowId: string): Observable<IOptions> {
    console.log('data custom row', rowId);
    return this.customApprovedData$.pipe(
      map(d => d.filter(v => v.option_key === rowId)),
      map(e => e.shift()))
  }


  onGlobalEditIconClicked(key: string) {
    console.log('onclick event', key);
    this.editor.data = null;
    this.editor.formType = this.global;

    this.getGlobalRowOptionsData$(key).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.editor.data = result;
        this.options.helptext = this.editor.data.helptext;
        this.options.description = this.editor.data.description;
        this.editor.reset();
        this.store.dispatch(new ShowEditorOption());
      }
      );
  }
  onCustomEditIconClicked(key: string) {
    console.log('onclick event', key);
    this.editor.data = null;
    this.editor.formType = this.custom;

    this.getCustomRowOptionsData$(key).pipe(take(1))
      .subscribe((result) => {
        console.log(result);
        this.editor.data = result;
        this.options.helptext = this.editor.data.helptext;
        this.options.description = this.editor.data.description;
        this.editor.reset();
        this.store.dispatch(new ShowEditorOption());
      }
      );
  }

  onCustomDeleteIconClicked(key: string) {
    this.dialogBoxService.show(`Are you sure you want to Revert this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteOption({ optionKey: key }));
        }
      });
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.globalGrid) {
      if (filterValue) {
        this.globalGrid.clearFilter();
        this.globalGrid.filteringLogic = FilteringLogic.Or;
        this.globalGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.globalGrid.clearFilter();
        this.globalGrid.filteringLogic = FilteringLogic.Or;
        this.globalGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
    else if (this.customGrid) {
      if (filterValue) {
        this.customGrid.clearFilter();
        this.customGrid.filteringLogic = FilteringLogic.Or;
        this.customGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.customGrid.clearFilter();
        this.customGrid.filteringLogic = FilteringLogic.Or;
        this.customGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }

}
