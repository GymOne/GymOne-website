import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import {ProfileService} from "../shared/services/profile.service";
import {AuthState} from "../shared/stores/states/auth.state";

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

  constructor(private _profileService: ProfileService, private _userData: AuthState) {}

  ngOnInit(): void {
  }


  onFileSelected(event) {
    const file:File = event.target.files[0];
    let formData = new FormData()
    formData.append("image", file, file.name)
    console.log(file.name)
    this._profileService.uploadProfilePicture(formData).subscribe(value => {
      console.log(value)
    })

  }

}
