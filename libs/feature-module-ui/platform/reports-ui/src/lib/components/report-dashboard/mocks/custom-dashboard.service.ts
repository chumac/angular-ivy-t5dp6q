import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICustomDashboard } from './dashboard';

// import { Dashboard } from '../../../models/models';

/**
 * Custom Dashboard Routes
 */

 /*
https://demos.devexpress.com/services/dashboard/api/dashboards?_=1611744556008   see dashboards1611744556008.json for response data.

https://demos.devexpress.com/services/dashboard/api/dashboards/SalesOverview?_=1611744556009     see sales-overview1611744556009.json for response data.

 https://demos.devexpress.com/services/dashboard/api/data/DashboardItemGetAction?dashboardId=SalesOverview&itemId=range    see sales-overview-range.json for response data.


 https://demos.devexpress.com/services/dashboard/api/data/DashboardItemGetAction?dashboardId=SalesOverview&itemId=gridSalesByState&query=%7B%22Filter%22%3A%5B%7B%22dimensions%22%3A%5B%7B%22%40ItemType%22%3A%22Dimension%22%2C%22%40DataMember%22%3A%22CurrentDate%22%2C%22%40Name%22%3A%22Date%22%2C%22%40DefaultId%22%3A%22DataItem1%22%2C%22%40DateTimeGroupInterval%22%3A%22MonthYear%22%7D%5D%2C%22range%22%3A%5B%222018-01-01T00%3A00%3A00.000%22%2C%222021-01-01T00%3A00%3A00.000%22%5D%7D%5D%7D        Data for item on the dashboard(salesByState Item) I don't really understand how this route is.
 */

@Injectable({
  providedIn: 'root'
})
export class CustomDashboardService {

  private readonly DASHBOARDS = 'assets/data/custom-dashboards.json';

  constructor(protected httpClient: HttpClient) { }

  public getDashboards(): Observable<ICustomDashboard[]> {

    return this.httpClient.get<ICustomDashboard[]>(this.DASHBOARDS);
  }

  public getDashboard(dashboardId: string): Observable<ICustomDashboard> {

    return this.httpClient.get<ICustomDashboard[]>(this.DASHBOARDS).pipe(
      map((dashboards: ICustomDashboard[]) =>
        dashboards.find(dashboard => dashboard.id === dashboardId)));
  }

}
