import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {catchError, first} from "rxjs/operators";
import {RegisterDto} from "../shared/register.dto";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {throwError} from "rxjs";
import {LoginDto} from "../shared/login.dto";
import {AuthService} from "../shared/auth.service";

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


  constructor(private formBuilder: FormBuilder, private _router:Router,private _auth:AuthService) { }

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


    this._auth.login(loginDto).pipe(
      catchError(err => {
        if(err.error){
          this.loginAlert = true;
        }
        return throwError(err);
      })
    )
      .subscribe(token =>{
        if(token && token.jwt){
          this.loginForm.disable();
          this._router.navigate(['home']);
          this.loginForm.reset();
          this.loginForm.enable();
          this.loginAlert = false;
        }
      });
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
