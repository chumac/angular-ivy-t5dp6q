
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAnnouncement } from '@nutela/models/core-data';


@Component({
  selector: 'x365-comparts-notice-board-card-modal',
  templateUrl: './notice-board-card-modal.component.html',
  styleUrls: ['./notice-board-card-modal.component.scss']
})
export class NoticeBoardCardModalComponent implements OnInit {  
  constructor(private dialogRef: MatDialogRef<NoticeBoardCardModalComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: IAnnouncement,) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close(true);  
  }

}
