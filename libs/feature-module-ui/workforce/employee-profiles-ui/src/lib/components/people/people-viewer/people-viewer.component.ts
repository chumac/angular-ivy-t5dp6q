import { Component, OnInit, Input, Inject } from '@angular/core';
import { IPeople } from '@nutela/models/workforce/personnel';
import { GENERAL } from '@nutela/shared/app-global';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '@nutela/core-services';
import { Observable } from 'rxjs';
import { IApiResult } from '@nutela/models/core-data';

@Component({
  selector: 'x365-fm-workforce-people-viewer',
  templateUrl: './people-viewer.component.html',
  styleUrls: ['./people-viewer.component.scss'],
})
export class PeopleViewerComponent implements OnInit {

  @Input() public pictureData: any;
  public isLoading: boolean = false;

  public defaultAvatar: string = '/assets/images/profile-avatar.png';
  public loadingAvatar: string = '/assets/images/loader.gif';
  public employeeAvatarUrl: string = '/api/employees/profile-image';


  constructor(private dialogRef: MatDialogRef<PeopleViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IPeople, private apiService: ApiService ) { }

  ngOnInit() {
    this.loadEmployeeImage(this.dialogData.employee_id);
  }

  get profilePicture(): string {
    if (this.pictureData) {
      return `${GENERAL.pngBase64Header}${this.pictureData}`;
    }
    else if (this.isLoading) {
      return `${this.loadingAvatar}`;
    } else {
      return `${this.defaultAvatar}`;
    }
  }

  loadEmployeeImage(id: number) {
    this.isLoading = true;
    this.apiService.read(`${this.employeeAvatarUrl}/${id}`).subscribe((data: IApiResult)=> {
      this.isLoading = false;
      const image = data.Results ? data.Results[0].image_profile : null;
      this.pictureData = image;
    });
  }

}
