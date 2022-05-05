import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {catchError, first} from "rxjs/operators";
import {RegisterDto} from "../../shared/dtos/register.dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {LoginDto} from "../../shared/dtos/login.dto";
import {AuthService} from "../../shared/services/auth.service";
import {Select, Store} from "@ngxs/store";
import {Login, Register} from "../../shared/stores/actions/auth.action";
import {AuthState} from "../../shared/stores/states/auth.state";

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.scss']
})
export class LogRegComponent implements OnInit {
  isFavorite = false;

  loginForm!: FormGroup;
  loginAlert: boolean = false;

  registerForm!: FormGroup;
  registerAlert: boolean = false;
  submitted:boolean = false;

  constructor(private formBuilder: FormBuilder, private _router:Router, private store: Store, private _auth: AuthService) {

    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if(isAuthenticated){
      this._router.navigate(['tracking']);
      this.loginForm.disable();
      this.loginForm.reset();
      this.loginForm.enable();
      this.loginAlert = false;
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get loginEmail() {
    return this.loginForm.get('email') as FormControl;
  }

  get loginPassword() {
    return this.loginForm.get('password') as FormControl;
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginDto = this.loginForm.value as LoginDto;

    this.store.dispatch(new Login(loginDto)).subscribe(success =>{
      this._router.navigate(['tracking']);
    })
  }

  closeLoginAlert() {
    this.loginAlert = false;
  }

  // --- Register ---

  get registerName() {
    return this.registerForm.get('name') as FormControl
  }

  get registerEmail() {
    return this.registerForm.get('email') as FormControl
  }

  get registerPassword() {
    return this.registerForm.get('password') as FormControl
  }

  // get passwordConfirm() {
  //   return this.registerForm.get('passwordConfirm') as FormControl
  // }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      return
    }

    const registerDto = this.registerForm.value as RegisterDto;

    this.store.dispatch(new Register(registerDto)).subscribe(
      success=>{
        this.registerForm.disable();
        this._router.navigate(['tracking']);
        this.registerForm.reset();
        this.registerForm.enable();
        this.registerAlert = false;
      },
      error => {

      });
// this.stores.dispatch(new Register(registerDto)).subscribe(
//   success => {
//   console.log("success")
// },
//     error => {
//       console.log("error")
// });
    //   console.log(success)
    //   this.registerForm.disable();
    //   this._router.navigate(['tracking']);
    //   this.registerForm.reset();
    //   this.registerForm.enable();
    //   this.registerAlert = false;




    // if (this.registerPassword.value != this.passwordConfirm.value) {
    //   return
    // }
  }

  closeRegisterAlert(){
    this.submitted=false;
  }

  displayName = true

  toggleClass() {
    if(this.isFavorite){
      this.isFavorite = false;
    }else{
      this.isFavorite = true;
    }
  }
}
