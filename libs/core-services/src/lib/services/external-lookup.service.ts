import { Injectable } from "@angular/core";
import { IApiResult, IStateSelectOption, ISelectOption } from "@nutela/models/core-data";
import { Observable } from "rxjs/internal/Observable";
import { switchMap, map } from "rxjs/internal/operators";
import { from } from "rxjs/internal/observable/from";
import { ApiService } from "./api.service";
import { EXTERNAL_LOOKUP_DATA_URLs } from "@nutela/shared/app-global";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: 'root'
})
export class ExternalLookupService {

  constructor(private apiService: ApiService, private utilService: UtilService) {}

  loadStateList(id: number) : Observable<any[]> {
    return this.apiService.read(`${EXTERNAL_LOOKUP_DATA_URLs.getStates}/${id}`).pipe(
        map((data: IApiResult) => {
            return  data.Results
        }),
        switchMap((data: ISelectOption[]) => {
            return from([this.utilService.transformToSelectDataList(data, 'state_id', 'description')])
        })
      );
  }

  loadCityList(id: number) : Observable<any[]> {
    return this.apiService.read(`${EXTERNAL_LOOKUP_DATA_URLs.getCities}/${id}`).pipe(
        map((data: IApiResult) => {
            return  data.Results
        }),
        switchMap((data: ISelectOption[]) => {
            return from([this.utilService.transformToSelectDataList(data, 'city_id', 'description')])
        })
      );
  }

  loadLGAList(id: number) : Observable<any[]> {
    return this.apiService.read(`${EXTERNAL_LOOKUP_DATA_URLs.getLgas}/${id}`).pipe(
        map((data: IApiResult) => {
            return  data.Results
        }),
        switchMap((data: ISelectOption[]) => {
            return from([this.utilService.transformToSelectDataList(data, 'lga_id', 'description')])
        })
      );
  }

}
