import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.scss']
})
export class LogRegComponent implements OnInit {
  isFavorite = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
    // this.getSomething()
    //   .subscribe(result => {
    //     // code to execute after the response arrived comes here
    //     let displayName = false;
    //   });
  }
  //
  // getSomething() {
  //   return this.someService.getData() // add `return`
  //     .map( // change to `map`
  //       result => {
  //         this.result = result;
  //       }
  // }
  displayName = true

  toggleClass() {
    if(this.isFavorite){
      this.isFavorite = false;
    }else{
      this.isFavorite = true;
    }
  }
}
