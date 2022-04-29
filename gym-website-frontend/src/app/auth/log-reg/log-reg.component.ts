import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {catchError, first} from "rxjs/operators";
import {RegisterDto} from "../shared/register.dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, throwError} from "rxjs";
import {LoginDto} from "../shared/login.dto";
import {AuthService} from "../shared/auth.service";
import {Select, Store} from "@ngxs/store";
import {Login} from "../../shared/auth/user.action";
import {UserAuthState} from "../../shared/auth/user.state";

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


  // @ts-ignore
  @Select(UserAuthState.getUser) currentUser: Observable<string>;


  constructor(private formBuilder: FormBuilder, private _router:Router, private store: Store, private _auth: AuthService) {
    // @ts-ignore
    this.currentUser.subscribe(
      (data) => {
        if (data) {
          console.log('reaching back')
          this.loginForm.disable();
          this._router.navigate(['home']);
          this.loginForm.reset();
          this.loginForm.enable();
          this.loginAlert = false;
        }
      });
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
      // passwordConfirm: ['', [Validators.required]],
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

    this.store.dispatch(new Login(loginDto));
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

    // if (this.registerPassword.value != this.passwordConfirm.value) {
    //   return
    // }
    const registerDto = this.registerForm.value as RegisterDto;
    this._auth.register(registerDto)
      .pipe(first())
      .subscribe({
        next: () => {
          this.submitted = true;
          this.registerAlert=true;
        },
        error: error => {
          this.submitted = true;
          this.registerAlert=false;
        },
      })
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
