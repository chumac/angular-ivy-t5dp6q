
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

import { IAppConfig, IPackageFile } from '../models';
import { ApiService, UtilService } from '@nutela/core-services';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private http: HttpClient;

  config: IAppConfig;
  packageFile: IPackageFile;

  constructor(handler: HttpBackend, private apiService: ApiService) {
    this.http = new HttpClient(handler);
  }

  load() {
    const file = `assets/config/app-config.json`;

    return new Promise<void>((resolve, reject) => {
        this.http.get<IAppConfig>(file).toPromise().then((response : IAppConfig) => {
          this.config = <IAppConfig>response;

          if (this.config && this.config.data) {
            this.apiService.apiBaseURL = this.config.data.api
          }

          this.apiService.version = environment.version;

           resolve();
        }).catch((response: any) => {
          console.log(response);
          reject(`Could not load config file: ${JSON.stringify(response)}`);
        });
    });
  }

  loadPackage() {
    const file = `package.json`;

    return new Promise<void>((resolve, reject) => {
        this.http.get<IPackageFile>(file).toPromise().then((response : IPackageFile) => {
          this.packageFile = <IPackageFile>response;

          if (this.packageFile) {
            console.log('this.packageFile.version', this.packageFile.version);
            this.apiService.version = this.packageFile.version;
          }

          // console.log('this.packageFile >>>', this.apiService.version);

           resolve();
        }).catch((response: any) => {
          console.log(response);
          reject(`Could not load package file: ${JSON.stringify(response)}`);
        });
    });
  }

}
