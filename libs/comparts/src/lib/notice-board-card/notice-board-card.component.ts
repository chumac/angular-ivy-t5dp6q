
import { Component, OnInit, Input } from '@angular/core';
import { IAnnouncement } from '@nutela/models/core-data';
import { NoticeBoardCardModalComponent } from '../notice-board-card-modal/notice-board-card-modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, VERSION} from '@angular/material';

@Component({
  selector: 'x365-comparts-notice-board-card',
  templateUrl: './notice-board-card.component.html',
  styleUrls: ['./notice-board-card.component.scss']
})
export class NoticeBoardCardComponent implements OnInit {
  @Input() public viewType: string;
  @Input() public announcements: IAnnouncement[];
  version = VERSION;
  noticeDialogRef: MatDialogRef<NoticeBoardCardModalComponent>;


  constructor(public dialog: MatDialog,) {}


  ngOnInit() {
    console.log('announcements', this.announcements);
  }

  viewAnnouncement(data) {
    console.log('modal data', data);
    this.openModal(data);
  }

  openModal(resultset: IAnnouncement): void {
    this.noticeDialogRef = this.dialog.open(NoticeBoardCardModalComponent, {
      width: '765px',
      data: resultset,
      panelClass: 'custom-dialog-container'
    });
  }

}
