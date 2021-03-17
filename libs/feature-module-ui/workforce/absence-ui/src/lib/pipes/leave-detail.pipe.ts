import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { IApiResult } from '@nutela/models/core-data';
import { ApiService } from '@nutela/core-services';

@Pipe({
  name: 'leaveDetail',
  pure: false
})
export class LeaveDetailPipe implements PipeTransform {
  
  constructor(private apiService: ApiService) { }

  transform(date: string, noOfDays, leaveType, displayType): any {
    let data;
    let url = '/api/utilities/get-leave-dates';
    let result;
    // if (url !== this.cachedUrl) {
    //   this.cachedData = null;
    //   this.cachedUrl = url;
    //   this.http.get(url).subscribe(result => this.cachedData = result);
    // }
    
    console.log('pipe args: ', date, ' days:', noOfDays, ' type:', leaveType, ' display_type:', displayType);

    if(!isNullOrUndefined(date) && !isNullOrUndefined(noOfDays) && !isNullOrUndefined(leaveType) && !isNullOrUndefined(displayType)) {
      console.log('Completed');
      this.apiService.read(`${url}?leaveID=${leaveType}&startDate=${date}&numberOfDays=${noOfDays}&returnVal=0`)
      .subscribe((response: IApiResult) => {
         data = response.Results[0];
         console.log('pie res before', data);
          switch(displayType) {
            case 1:
              result = data.leave_end_date;
              break;
            case 2:
              result = data.leave_resume_date;
              break;
            default:
              result = new Date();
          } 
      });
    }
    console.log('pie res after', data);
    return result;
  }
}