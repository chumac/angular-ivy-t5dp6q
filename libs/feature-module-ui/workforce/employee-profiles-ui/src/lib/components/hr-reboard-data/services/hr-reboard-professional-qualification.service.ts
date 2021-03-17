import { Injectable, ViewChild } from "@angular/core";

import { Store } from "@ngrx/store";

import { HrzCommandTypes } from "@nutela/shared/ui";
import { LoadApprovedDataProfessionalQualifications, LoadAwaitingApprovalDataProfessionalQualifications, ShowEditorProfessionalQualifications, LoadDataProfessionalQualifications } from '@nutela/store/modules/workforce/employee-profiles';
import { IAppState } from "@nutela/store/app-state";
import { ShowToast } from "@nutela/store/shared";
import { ToastTypes } from "@nutela/shared/app-global";
import { ProfessionalQualificationsEditorService } from "../../../com-parts/employee-info-panes/professional-qualifications/professional-qualifications-editor/professional-qualifications-editor.service";
import { ProfessionalQualificationsEditorComponent } from "../../../com-parts/employee-info-panes/professional-qualifications/professional-qualifications-editor/professional-qualifications-editor.component";
import { ShowEditorHrReboardProfessionalQualifications, LoadDataHrReboardProfessionalQualifications } from "../../../store/hr-reboard-data";

@Injectable()
export class HrReboardProfessionalQualificationService {

  @ViewChild('editor') editor: ProfessionalQualificationsEditorComponent;


  constructor(private store: Store<IAppState>, private professionalQualificationsEditorService: ProfessionalQualificationsEditorService) {}

  commandProcessor(command: HrzCommandTypes, employeeId: number) {
    switch (command) {
      case HrzCommandTypes.ADD: {
        this.showEditor();
        break;
      }
      case HrzCommandTypes.REFRESH: {
        this.refreshData(employeeId);
        break;
      }
      default:
        break;
    }
  }

  showEditor() {
    this.store.dispatch(new ShowEditorHrReboardProfessionalQualifications());
  }

  refreshData(employeeId: number) {
    this.store.dispatch(new LoadDataHrReboardProfessionalQualifications({ employeeId}));
    this.store.dispatch(new ShowToast({title: null, message: `Professional Qualification Information is being refreshed.`, type: ToastTypes.INFO}));
  }
}
