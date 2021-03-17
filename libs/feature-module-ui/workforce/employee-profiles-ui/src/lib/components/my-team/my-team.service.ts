import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';
import { MY_TEAM_DATA_URLs } from '../../constants';
import { ISelectOption, IApiResult } from '@nutela/models/core-data';
import { switchMap, catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';
import { ShowToast } from '@nutela/store/shared';
import { ToastTypes } from '@nutela/shared/app-global';
import { IProfilePicture } from '@nutela/models/workforce/employee-profiles';


@Injectable({
  providedIn: 'root'
})
export class MyTeamService {

  public filterList: ISelectOption[] = [
    { value: '', label: 'All Columns' },
    { value: 'employee_firstname', label: 'First name' },
    { value: 'employee_surname', label: 'Surname' },
    { value: 'position', label: 'Position' }
  ];


  constructor(private apiService: ApiService) { }

  getImages(id): Observable<IProfilePicture> {
    return this.apiService.read(`${MY_TEAM_DATA_URLs.getMembersPic}/${id}`).pipe(
      switchMap((data: IApiResult) => {
        if (data.Success && data.Results) {
          return of(data.Results[0]);
        } else {
          return of(null);
        }
      }),
      catchError(e => of(
        new ShowToast({ title: 'Team Data Could Not Be Loaded', message: 'Something went wrong. Form data could not be loaded.', type: ToastTypes.ERROR })
      ))
    );
  }

}
