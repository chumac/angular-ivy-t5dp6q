import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { ISelectOptionData } from '@nutela/models/common';
import { getSelectOptionData } from '@nutela/store/modules/foundation';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { ISelectOption } from '@nutela/models/core-data';

import { HrzCommandTypes} from '@nutela/shared/ui';
import { IBusinessType } from '@nutela/models/platform/lookup';
import { getBusinessType, LoadBusinessTypeData, showEditorBusinessType, ShowEditorBusinessType, HideEditorBusinessType, DeleteBusinessType, isProcessingBusinessType, ProcessingBusinessType } from '../../store';
import { BusinessTypeEditorComponent } from './business-type-editor/business-type-editor.component';
import { IgxGridComponent,
  FilteringLogic,
  IgxStringFilteringOperand } from 'igniteui-angular';
import { take } from 'rxjs/operators';
import { ILookupState } from '../../store';
import { BusinessTypeService } from '../services';
import { Title } from '@angular/platform-browser';





@Component({
  selector: 'x365-fm-plf-hrf-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss']
})
export class BusinessTypeComponent implements OnInit {
  showEditor$: Observable<boolean>;
  isProcessing$:Observable<boolean>;
  selectOptionData$: Observable<ISelectOptionData>;

  public data: any[];

  public businessTypeData$: Observable<IBusinessType[]>;
  public approvedData$: Observable<IBusinessType[]>;
  dropDownFilterValue:string;
 @ViewChild('businessGrid') businessGrid: IgxGridComponent;

  @ViewChild('editor') editor: BusinessTypeEditorComponent;

  constructor(@Inject('partialDocumentTitle')
              private partialDocumentTitle: string,
              private titleService: Title,private store: Store<ILookupState>,
              private dialogBoxService: DialogBoxService,
              public business: BusinessTypeService) {
                titleService.setTitle(
                  `${'Business Type'}${this.partialDocumentTitle}`
                );
              }


  ngOnInit() {
    this.storeSelects();
    this.storeDispatches();
  }

  storeDispatches() {
    this.store.dispatch(new LoadBusinessTypeData());
    this.store.dispatch(new ProcessingBusinessType());
  }

  storeSelects() {
    this.showEditor$ = this.store.pipe(select(showEditorBusinessType));
    this.businessTypeData$ = this.store.pipe(select(getBusinessType));
    this.isProcessing$=this.store.pipe(select(isProcessingBusinessType));
  }

  getRowBusinessTypeData$(rowId: number): Observable<IBusinessType> {
    console.log('data row', rowId);
    return this.businessTypeData$.pipe(
      map(d => d.filter(v => v.biztype_id === rowId)),
      map(e => e.shift()))
  }

  onAdd(){
    this.business.add();
  }

  onRefreshedButtonClicked(){
    this.business.refresh();
  }

  onEditIconClicked(row_id: number) {
    this.editor.data = null;
    this.getRowBusinessTypeData$(row_id).pipe(take(1))
      .subscribe((result) => {
         this.editor.data = result;
         this.editor.reset();
        this.store.dispatch(new ShowEditorBusinessType());
      }
      );
  }

  onDeleteIconClicked(row_id:number){
    console.log(row_id);
    this.dialogBoxService.show(`Are you sure you want to delete this?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new DeleteBusinessType({recordId: row_id}));
        }
      });
  }

  onCancelEditor() {
     this.store.dispatch(new HideEditorBusinessType());
  }

  onFilterListSelected(data) {
    this.dropDownFilterValue = data.value;
  }

  filter(term: string, filterValue: string) {
    if (this.businessGrid) {
      if (filterValue) {
        this.businessGrid.clearFilter();
        this.businessGrid.filteringLogic = FilteringLogic.Or;
        this.businessGrid.filter(
          filterValue,
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      } else {
        this.businessGrid.clearFilter();
        this.businessGrid.filteringLogic = FilteringLogic.Or;
        this.businessGrid.filterGlobal(
          term,
          IgxStringFilteringOperand.instance().condition('contains'),
          false
        );
      }
    }
  }
}
