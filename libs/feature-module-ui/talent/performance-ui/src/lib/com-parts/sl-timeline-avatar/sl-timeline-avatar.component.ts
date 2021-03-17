import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DialogBoxService, DialogBoxCommandTypes } from '@nutela/shared/ui';
import { Store, select, ActionsSubject  } from '@ngrx/store';
import { IPerformanceState } from '../../store/root';
import { SlTimelineAvatarService } from './sl-timeline-avatar.service';
import { GENERAL, ToastTypes, PROFILE_AVATAR } from '@nutela/shared/app-global';
import { from } from 'rxjs/internal/observable/from';
import { LoadImageCacheProgressReportSuccess, getImageCacheProgressReport } from '../../store/planning/progress-report';
import { IImageCache } from '../../interfaces';



@Component({
  selector: 'x365-fm-talent-sl-timeline-avatar',
  templateUrl: './sl-timeline-avatar.component.html',
  styleUrls: ['./sl-timeline-avatar.component.scss'],
  providers: [SlTimelineAvatarService],
}
)
export class SlTimelineAvatarComponent implements OnInit {
  @Input() employeeId: number;
  employeePhoto: any;
  imageBaseHeader: string;
  photoObj$: Observable<any[]>;


  constructor(private store: Store<IPerformanceState>, private actionsSubject: ActionsSubject, private slTimelineAvatarService: SlTimelineAvatarService, private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
    this.imageBaseHeader =  `${GENERAL.pngBase64Header}`;
    this.loadEmployeePhoto();
    this.photoObj$ = this.store.pipe(select(getImageCacheProgressReport));
  }

  loadEmployeePhoto() {
    this.slTimelineAvatarService.getEmployeePhoto(this.employeeId?this.employeeId:null)
    .subscribe((data)=>{
      if(data.Success && data.Results){
        this.employeePhoto = data.Results;
        this.employeePhoto[0].image_profile = this.imageBaseHeader + data.Results[0].image_profile;
        this.store.dispatch(new LoadImageCacheProgressReportSuccess(this.employeePhoto));
      } else {
        this.employeePhoto = null;
      }
    }, 
    (error)=>{

    });
  } 
  


}
