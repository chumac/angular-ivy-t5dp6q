import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiService } from '@nutela/core-services';
import { IApiResult } from '@nutela/models/core-data';

@Component({
  selector: 'x365-shared-ui-employee-passport-photo',
  templateUrl: './employee-passport-photo.component.html',
  styleUrls: ['./employee-passport-photo.component.scss']
})
export class EmployeePassportPhotoComponent implements OnInit, OnChanges {
  @Input() imgBinary: string;
  @Input() rounded: boolean = true;
  @Input() size: number = 32;
  @Input() employeeId: number;
  @Input() isLoading: boolean;

  private url: string = '/api/employees/profile-image';

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.employeeId) {
      this.isLoading = true;
      this.apiService
        .read(`${this.url}/${this.employeeId}`)
        .subscribe((data: IApiResult) => {
          if (data.Success) {
            this.isLoading = false;
            this.imgBinary =   data.Results.length?`data:image/png;base64,${ data.Results[0].image_personal}`: null;
          }
        });
    }
  }
  
}
