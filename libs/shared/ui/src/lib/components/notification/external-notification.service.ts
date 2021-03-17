import { Injectable } from "@angular/core";
import { IApiResult, IStateSelectOption, ISelectOption } from "@nutela/models/core-data";
import { Observable } from "rxjs/internal/Observable";
import { switchMap, map } from "rxjs/internal/operators";
import { from } from "rxjs/internal/observable/from";
import { WORK_LIFE_DATA_URLs } from "@nutela/shared/app-global";
import { ApiService, UtilService } from "@nutela/core-services";

@Injectable({
  providedIn: 'root'
})
export class ExternalNotificationService {

  constructor(private apiService: ApiService, private utilService: UtilService) {}

  loadWorkflowQueues() : Observable<any[]> {
    return this.apiService.read(`${WORK_LIFE_DATA_URLs.workflowQueues}`).pipe(
        map((data: IApiResult) => {
            return  data.Results
        }),
        // switchMap((data: ISelectOption[]) => {
        //     return from([this.utilService.transformToSelectDataList(data, 'id', 'description')])
        // })
      );
  }

}
