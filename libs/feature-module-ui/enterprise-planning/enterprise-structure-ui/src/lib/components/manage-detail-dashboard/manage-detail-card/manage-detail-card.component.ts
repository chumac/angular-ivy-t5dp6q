
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';

import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '@nutela/store/app-state';
import { map, take } from 'rxjs/operators';
import { ConnectEditorComponent } from './connect-editor/connect-editor.component';
import { SelectComponent } from 'ng-uikit-pro-standard';
import { ISelectOption } from '@nutela/models/core-data';
import { getEnterpriseStructureDetails, LoadEnterpriseStructureDetails, ShowEditorConnectEnterpriseStructureDetail, showEditorConnectEnterpriseStructureDetail, HideEditorConnectEnterpriseStructureDetail, showEditorAddCostCentreEnterpriseStructureDetail, ShowEditorAddCostCentreEnterpriseStructureDetail, HideEditorAddCostCentreEnterpriseStructureDetail, RemoveAllEmployeesFromDetail, showEditorSharedCode, ShowEditorSharedCode, HideEditorSharedCode, ChangeStructureTypeEnterpriseStructureDetail, getCostCentresData, LoadCostCentresData, showEditorRemoveCostCentreEnterpriseStructureDetail, LoadByIdCostCentresData, ShowEditorRemoveCostCentreEnterpriseStructureDetail, getByIdCostCentresData, HideEditorRemoveCostCentreEnterpriseStructureDetail, ShowEditorConnectChildrenEnterpriseStructureDetail, showEditorConnectChildrenEnterpriseStructureDetail, HideEditorConnectChildrenEnterpriseStructureDetail } from '../../../store/enterprise-structure-detail';
import { getEnterpriseStructureTypes, LoadEnterpriseStructureTypes } from '../../../store/enterprise-structure-type';
import { IEnterpriseStructureDetail, IEnterpriseStructure, ICostCentreTransform } from '../../../models/interfaces';
import { EnterpriseStructureSharedDataService, EnterpriseStructureUtilService } from '../../../services';
import { SharedCodeEditorComponent } from './shared-code-editor/shared-code-editor.component';
import { ConnectChildrenEditorComponent } from './connect-children-editor/connect-children-editor.component';
import { STANDARD_ROUTES } from '@nutela/shared/app-global';

@Component({
  selector: 'x365-fm-es-manage-detail-card',
  templateUrl: './manage-detail-card.component.html',
  styleUrls: ['./manage-detail-card.component.scss']
})
export class ManageStructureDetailCardComponent implements OnInit {

  @Input() selectedDetails: IEnterpriseStructureDetail[];
  @Input() structureNameAndId: any;

  analysisDetailId: number;
  higherStructures: IEnterpriseStructure[];
  enterpriseStructures: IEnterpriseStructure[];
  entStrucTypeTransformed: ISelectOption[];
  workingStructure: IEnterpriseStructure;
  destinationStructure: IEnterpriseStructure;
  structureDetailData: IEnterpriseStructureDetail;

  analysisDetailsData$: Observable<IEnterpriseStructureDetail[]>;
  enterpriseStructureData$: Observable<IEnterpriseStructure[]>;
  showEditorConnect$: Observable<boolean>;
  showEditorConnectChildren$: Observable<boolean>;
  showAddCostCentreEditor$: Observable<boolean>;
  showRemoveCostCentreEditor$: Observable<boolean>;
  showSharedCodeEditor$: Observable<boolean>;
  costCentresData$: Observable<ICostCentreTransform[]>;
  costCentresByIdData$: Observable<ICostCentreTransform[]>;

  @ViewChild('connectEditor') connectEditor: ConnectEditorComponent;
  @ViewChild('connectChildrenEditor') connectChildrenEditor: ConnectChildrenEditorComponent;
  @ViewChild('selec') selec: SelectComponent;
  @ViewChild('val') val: ElementRef;
  @ViewChild('sharedCode') sharedCode: SharedCodeEditorComponent;




  constructor(private dialogBoxService: DialogBoxService, private router: Router, private store: Store<IAppState>, public utilService: EnterpriseStructureUtilService) { }
  optionsSelect: any[];

  ngOnInit() {
    this.storeSelect();
    this.storeDispatch();
    this.checkForEmptyDetails();
    this.getTransformedEntStructureType();
    this.getStructureData$(this.structureNameAndId.id).subscribe(r => {
      this.workingStructure = r;
    })
  }

  storeSelect() {
    this.analysisDetailsData$ = this.store.pipe(select(getEnterpriseStructureDetails))
    this.enterpriseStructureData$ = this.store.pipe(select(getEnterpriseStructureTypes))
    this.showEditorConnect$ = this.store.pipe(select(showEditorConnectEnterpriseStructureDetail))
    this.showEditorConnectChildren$ = this.store.pipe(select(showEditorConnectChildrenEnterpriseStructureDetail))
    this.showAddCostCentreEditor$ = this.store.pipe(select(showEditorAddCostCentreEnterpriseStructureDetail))
    this.showRemoveCostCentreEditor$ = this.store.pipe(select(showEditorRemoveCostCentreEnterpriseStructureDetail))
    this.showSharedCodeEditor$ = this.store.pipe(select(showEditorSharedCode));
    this.costCentresData$ = this.store.pipe(select(getCostCentresData));
    this.costCentresByIdData$ = this.store.pipe(select(getByIdCostCentresData));
  }

  storeDispatch() {
    this.store.dispatch(new LoadEnterpriseStructureTypes());
    this.store.dispatch(new LoadEnterpriseStructureDetails({ recordId: this.structureNameAndId.id }))
    this.store.dispatch(new LoadCostCentresData());
  }

  getStructureData$(analysisId: number): Observable<IEnterpriseStructure> {
    return this.enterpriseStructureData$.pipe(
      map(d => d.filter(v => v.analysis_id == analysisId)),
      map(e => e.shift()))
  }
  getStructureDetailData$(analysisDetId: number): Observable<IEnterpriseStructureDetail> {
    return this.analysisDetailsData$.pipe(
      map(d => d.filter(v => v.analysis_det_id == analysisDetId)),
      map(e => e.shift()))
  }

  getTransformedEntStructureType() {
    this.enterpriseStructureData$.subscribe(
      val => {
        this.entStrucTypeTransformed = this.utilService.transformToSelectDataList(val, 'analysis_id', 'description');
      }
    )
  }

  get linkTo(): string {
    let structureDetail = '';
    if (this.selectedDetails.length != 0) {
      this.selectedDetails.forEach(detail => {
        if (detail.AnalysisInfo.description != null && detail.AnalysisDetailsLinkInfo.description != null) {
          structureDetail = `${detail.AnalysisInfo.description} (${detail.AnalysisDetailsLinkInfo.description})`;
        } else {
          structureDetail = `---`;
        }

      });
      return structureDetail;
    }
  }

  get headedBy(): string {
    let employeeDetail = '';
    if (this.selectedDetails.length != 0) {
      this.selectedDetails.forEach(detail => {
        if (detail.headed_by.employee_firstname != null && detail.headed_by.employee_surname != null && detail.headed_by_position.description != null) {
          employeeDetail = `${detail.headed_by.employee_firstname} ${detail.headed_by.employee_surname} (${detail.headed_by_position.description})`;
        } else {
          employeeDetail = `---`;
        }

      });
      return employeeDetail;
    }
  }

  onRemoveAllEmployeesSelected($event: any) {
    this.dialogBoxService.show(`Are you sure you want to remove all Employees from this structure detail?`)
      .subscribe((command: string) => {
        if (command === DialogBoxCommandTypes.COMMAND1) {
          this.store.dispatch(new RemoveAllEmployeesFromDetail({ recordId: $event.innerHTML }))
        }
      });

  }

  onReconnectChildrenSelected(event: any) {
    this.getStructureData$(this.structureNameAndId.id).pipe(take(1)).subscribe(r => {
      this.enterpriseStructureData$.pipe(take(1)).subscribe(data => {
        this.higherStructures = data.filter(v => v.ranking <= r.ranking);
      })
    });
    this.analysisDetailId = event.innerHTML;
    this.store.dispatch(new ShowEditorConnectChildrenEnterpriseStructureDetail());


  }

  onReconnectDetailSelected(event: any) {
    this.getStructureData$(this.structureNameAndId.id)
      .pipe(take(1))
      .subscribe(r => {
        this.enterpriseStructureData$.pipe(
          take(1))
          .subscribe(data => {
            this.higherStructures = data.filter(v => v.ranking < r.ranking);
          })
      });
    this.analysisDetailId = event.innerHTML;
    this.store.dispatch(new ShowEditorConnectEnterpriseStructureDetail());
  }

  onStructureSelected(event, des) {
    this.getStructureData$(event.value).subscribe(destinationStructure => {
      this.destinationStructure = destinationStructure;
    });

    if (this.workingStructure.ranking < this.destinationStructure.ranking) {
      this.dialogBoxService.show(`You are about to demote this Structure, do you wish you continue?`)
        .pipe(take(1))
        .subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.selec.value = null;
            this.selec.clear();
            this.store.dispatch(new ChangeStructureTypeEnterpriseStructureDetail({ currentType: this.workingStructure.analysis_id, newType: this.destinationStructure.analysis_id }))
          }
        });
    } else if (this.workingStructure.ranking > this.destinationStructure.ranking) {
      this.dialogBoxService.show(`You are about to promote this Structure, do you wish you continue?`)
        .subscribe((command: string) => {
          if (command === DialogBoxCommandTypes.COMMAND1) {
            this.selec.value = null;
            this.selec.clear()
            this.store.dispatch(new ChangeStructureTypeEnterpriseStructureDetail({ currentType: this.workingStructure.analysis_id, newType: this.destinationStructure.analysis_id }));
          }
        });
    }
  }

  onAddCostCentresSelected(event) {
    this.analysisDetailId = event.innerHTML;
    this.store.dispatch(new ShowEditorAddCostCentreEnterpriseStructureDetail());
  }
  onRemoveCostCentresSelected(event) {
    this.analysisDetailId = event.innerHTML;
    this.store.dispatch(new LoadByIdCostCentresData({ recordId: this.analysisDetailId }));
    this.store.dispatch(new ShowEditorRemoveCostCentreEnterpriseStructureDetail());
  }

  onShareCodeSelected($event: any) {
    this.getStructureDetailData$($event.innerHTML).subscribe(val => {
      this.structureDetailData = val;
      this.sharedCode.data = val;
    })
    this.store.dispatch(new ShowEditorSharedCode())

  }

  checkForEmptyDetails() {
    if (this.selectedDetails === undefined) {
      this.router.navigate([`${STANDARD_ROUTES.enterpriseStructuretypes}`])
    }
  }

  onCancelEditor() {
    this.store.dispatch(new HideEditorConnectEnterpriseStructureDetail());
    this.store.dispatch(new HideEditorConnectChildrenEnterpriseStructureDetail());
    this.store.dispatch(new HideEditorAddCostCentreEnterpriseStructureDetail());
    this.store.dispatch(new HideEditorRemoveCostCentreEnterpriseStructureDetail());
    this.store.dispatch(new HideEditorSharedCode());
  }

}
