import { Injectable } from '@angular/core';
import { ApiService } from '@nutela/core-services';
import * as constants from '../../constants';


@Injectable()
export class WorkStreamPanelService {


  constructor(private apiService: ApiService) {}

  getWorkStreams(id) {
    return this.apiService.read(`${constants.TIME_SHEET_DAY_STREAM_DATA_URLs.getDayStream}/${id}`);
  }

}
