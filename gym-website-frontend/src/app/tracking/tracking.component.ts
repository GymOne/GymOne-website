import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  inputDate: any;


  constructor() { }

  ngOnInit(): void {

  }

  displayName = true


  onValueChanged() {
    var date = this.inputDate as Date;
    //TODO retrieve exercise sets by date from backend
  }
}
