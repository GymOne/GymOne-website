import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  fileToUpload: File | null = null;

  @Input()
  requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;

  constructor() {}

  ngOnInit(): void {
  }


  onFileSelected(event) {
    const file:File = event.target.files[0];
    console.log(file.name)

  }

}
