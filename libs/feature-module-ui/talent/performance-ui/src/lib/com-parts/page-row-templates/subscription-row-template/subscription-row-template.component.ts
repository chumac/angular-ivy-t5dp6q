import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ISubscriptionRowData } from '../../../models';
import { IObjectiveRating, ICourse } from '@nutela/models/talent/performance';
import { ISelectOption } from 'dist/libs/models/core-data';
import { RatingEditMode } from '../../../enumerations';
import { CheckboxComponent } from 'ng-uikit-pro-standard';
import { DxListComponent } from 'devextreme-angular';

@Component({
  selector: 'x365-fm-talent-subscription-row-template',
  templateUrl: './subscription-row-template.component.html',
  styleUrls: ['./subscription-row-template.component.scss']
})
export class SubscriptionRowTemplateComponent implements OnInit {
  public addedCourses: ICourse[];
  public selectedAddedCourses: ICourse[] = [];
  public masterSelected:boolean;

  @Input() public index: number = null;
  @Input() public disableButton: boolean;
  @Input() public data: ISubscriptionRowData[];
  @Input() public courses: ICourse[];
  @Input() public valueLabelRatings: ISelectOption[];
  @Input() public mode: RatingEditMode = RatingEditMode.EMP_EDIT;

  @ViewChild("coursesList") public coursesList: DxListComponent;
  @ViewChild("ch") public ch: CheckboxComponent;

  constructor() {
    this.masterSelected = false;
    this.addedCourses = []
  }

  ngOnInit() {
  }

  get showSelectAllCheckbox(): boolean {
    if(this.addedCourses.length == 0) {
      return false;
    } else {
      return true;
    }
  }


  onSelect() {
    console.log(this.coursesList.selectedItems);
    if(this.coursesList.selectedItems.length > 0) {
      this.courses.forEach(course => {
        this.coursesList.selectedItems.forEach(item => {
          if(course.course_id === item.course_id) {
            this.addedCourses.push(course);
          }
        })
      });

      for( var i = this.courses.length - 1; i >= 0; i--){
        for( var j = 0; j < this.coursesList.selectedItems.length; j++){
            if(this.courses[i] && (this.courses[i].course_id === this.coursesList.selectedItems[j].course_id)){
            this.courses.splice(i, 1);
          }
        }
      }
    }
  }

  onUnSelect() {
    this.addedCourses.forEach(course => {
      this.selectedAddedCourses.forEach(item => {
        if(course.course_id === item.course_id) {
          course.isSelected = false;
          this.courses.unshift(course);
          this.coursesList.selectedItems = [];
          this.ch.checked = false
        }
      })
    });
    for( var i=this.addedCourses.length - 1; i>=0; i--){
      for( var j=0; j<this.selectedAddedCourses.length; j++){
          if(this.addedCourses[i] && (this.addedCourses[i].course_id === this.selectedAddedCourses[j].course_id)){
          this.addedCourses.splice(i, 1);
        }
      }
    }
  }


  checkUncheckAll(event) {
    this.masterSelected = event.checked
    for (var i = 0; i < this.addedCourses.length; i++) {
      this.addedCourses[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.courses.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }


  getCheckedItemList(){
    this.selectedAddedCourses = [];
    for (var i = 0; i < this.addedCourses.length; i++) {
      if(this.addedCourses[i].isSelected)
      this.selectedAddedCourses.push(this.addedCourses[i]);
    }
  }
  // onRatingSelected($event: ISelectOption) {
  //   const rating = this.getRatingObject(Number($event.value));
  //   if (rating) {
  //     this.data.ratingValue = rating.rating_value;
  //     this.data.ratingText = rating.description;
  //   }
  // }

  // onLineManagerRatingSelected($event: ISelectOption) {
  //   const rating = this.getRatingObject(Number($event.value));
  //   if (rating) {
  //     this.data.lmRatingValue = rating.rating_value;
  //     this.data.lmRatingText = rating.description;
  //   }
  // }

  getCourseObject(courseId: number): ICourse {
    for (let course of this.courses) {
      if (course.course_id === courseId) {
        return course;
      }
    }
  }

  get employeeEditField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return true;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return false
    }
  }

  get employeeReadField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return true;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return true;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return true
    }
  }

  get lineManagerEditField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return true;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return false
    }
  }

  get lineManagerReadField(): boolean {
    if (this.mode === RatingEditMode.EMP_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.EMP_READ_ONLY) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_EDIT) {
      return false;
    } else if (this.mode === RatingEditMode.LMGR_READ_ONLY) {
      return true;
    }
  }
}
