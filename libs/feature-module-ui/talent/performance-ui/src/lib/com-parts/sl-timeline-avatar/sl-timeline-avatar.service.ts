import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';
import * as constants from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class SlTimelineAvatarService {


  constructor(private apiService: ApiService) {}

  getEmployeePhoto(id) {
    return this.apiService.read(`${constants.PROGRESS_REPORT_DATA_URLs.getEmployeePhoto}/${id}`);
  }

}
