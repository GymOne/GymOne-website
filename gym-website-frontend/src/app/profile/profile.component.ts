import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Observer, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {finalize} from "rxjs/operators";
import {ProfileService} from "../shared/services/profile.service";
import {AuthState} from "../shared/stores/states/auth.state";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {DomSanitizer} from "@angular/platform-browser";
import {Select} from "@ngxs/store";
import {FriendService} from "../shared/services/friend.service";

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
  imagerrr= null;
  @Select(AuthState.getEmail) $email : Observable<string>;
  email= ''

  name = null

  constructor(private _friendService: FriendService , private _profileService: ProfileService, private _userData: AuthState, public domSanitizer: DomSanitizer) { }


  async ngOnInit() {
    this.$email.subscribe(em => {
      this.email = em
    })
    this.getImage()
  }

  readAsDataURL(blob: Blob): Observable<string> {
    return new Observable((obs: Observer<string>) => {
      const reader: FileReader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result as string);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }
  getImage(){
    if (this._userData){
      this._profileService.getImage(this.email).subscribe(im => {
        console.log('My image:  '+im);
        var byteArray = new Uint8Array(im.image[0].data.data);
        var blob = new Blob([byteArray], { type: 'image/png' });
        this.readAsDataURL(blob).subscribe((data) =>{
          this.imagerrr = this.domSanitizer.bypassSecurityTrustResourceUrl(data);
        })
        this.imagerrr =im.image[0].data.data.toString('base64');
        const base64EncodedStr = btoa(im.image[0].data.data.toString())
        this.imagerrr =base64EncodedStr;

        this.imagerrr = btoa( im.image[0].data.data.toString() );
        console.log(this.imagerrr)
      })
    }
  }





  onFileSelected(event) {
    console.log(event.target.file)
    const file:File = event.target.files[0];
    let formData = new FormData()
    if (this.email){
      formData.append('image', file, this.email)
      console.log(formData)
      this._profileService.uploadProfilePicture(formData).subscribe(value => {
        console.log(value)
      })
    }
  }

  saveChanges() {

  }
}
