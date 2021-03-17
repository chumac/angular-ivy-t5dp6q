import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'x365-fm-plf-prov-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss']
})
export class EmployeeDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(new Date());
  }

}
