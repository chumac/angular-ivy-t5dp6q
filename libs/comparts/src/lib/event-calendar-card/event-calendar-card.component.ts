import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IAnniversary } from '@nutela/models/core-data';
import { formatDate } from '@angular/common';

@Component({
 selector: 'x365-comparts-event-calendar-card',
 templateUrl: './event-calendar-card.component.html',
 styleUrls: ['./event-calendar-card.component.scss']
})
export class EventCalendarCardComponent implements OnInit {

 @Input() public viewType: string;
 @Input() public birthDays: IAnniversary[];
 @Input() public weddingAnniversaries: IAnniversary[];
 @Input() public workAnniversaries: IAnniversary[];

 selectedDate = new Date();
 formattedSelectedDate: string;
 filteredBirthdays: IAnniversary[];
 filteredWedAnniversaries: IAnniversary[];
 filteredWorkAnniversaries: IAnniversary[];

 @Output() viewTypeSwitch: EventEmitter<string> = new EventEmitter();

 constructor() { }

 ngOnInit() {
   this.selectedDate = new Date();
 }

 onEventSelection($event: any, type: string) {
   this.viewTypeSwitch.emit(type);
 }

 get cardTitle(): string {
   if (this.viewType === 'Birthday') {
     return 'Birthdays';
   } else if (this.viewType === 'Wedding') {
     return 'Wedding Anniversaries';
   } else if (this.viewType === 'Work') {
     return 'Corporate Anniversaries';
   }
 }

 get noLocation(): boolean {
   if (this.birthDays) {
     let locType = this.birthDays.filter(x => x.location_type);
     let locName = this.birthDays.filter(x => x.location_name);
     if (locType === null && locName === null) {
       return false;
     } else {
       true;
     }
   } else if (this.weddingAnniversaries) {
     let locType = this.weddingAnniversaries.filter(x => x.location_type);
     let locName = this.weddingAnniversaries.filter(x => x.location_name);
     if (locType === null && locName === null) {
       return false;
     } else {
       true;
     }
   } else if (this.workAnniversaries) {
     let locType = this.workAnniversaries.filter(x => x.location_type);
     let locName = this.workAnniversaries.filter(x => x.location_name);
     if (locType === null && locName === null) {
       return false;
     } else {
       true;
     }
   }
 }

 get showBirthDayData(): boolean {
   if (this.viewType === 'Birthday') {
     return true;
   } else {
     return false;
   }
 }

 get showWeddingAnniversaryData(): boolean {
   if (this.viewType === 'Wedding') {
     return true;
   } else {
     return false;
   }
 }

 get showWorkAnniversaryData(): boolean {
   if (this.viewType === 'Work') {
     return true;
   } else {
     return false;
   }
 }

 selectDate(date: Date) {
   this.selectedDate = new Date(date);
   this.formattedSelectedDate = formatDate(this.selectedDate, 'yyyy-MM-ddT00:00:00', 'en-US', '+0530');

   if (this.showBirthDayData) {
     this.filteredBirthdays = this.birthDays;
     this.filteredBirthdays = this.birthDays.filter(b => b.reference_date === this.formattedSelectedDate);
   } else if (this.showWeddingAnniversaryData) {
     this.filteredWedAnniversaries = this.weddingAnniversaries;
     this.filteredWedAnniversaries = this.weddingAnniversaries.filter(wed => wed.reference_date === this.formattedSelectedDate);
   } else if (this.showWorkAnniversaryData) {
     this.filteredWorkAnniversaries = this.workAnniversaries;
     this.filteredWorkAnniversaries = this.workAnniversaries.filter(work => work.reference_date === this.formattedSelectedDate);
   }
 }

 getAnniversaryName(val): string {
   return val;
 }

 getAnniversaryLocation(val): string {
   return val;
 }
}
