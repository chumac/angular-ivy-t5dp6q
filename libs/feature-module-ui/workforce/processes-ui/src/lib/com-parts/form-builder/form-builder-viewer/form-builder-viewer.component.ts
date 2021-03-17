import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IFormBuilder } from '@nutela/models/workforce/employee-profiles';

@Component({
  selector: 'x365-form-builder-viewer-form-builder-viewer',
  templateUrl: './form-builder-viewer.component.html',
  styleUrls: ['./form-builder-viewer.component.scss']
})
export class FormBuilderViewerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormBuilderViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFormBuilder) { }

  ngOnInit() {
    console.log('data', this.data); 
  }

}
