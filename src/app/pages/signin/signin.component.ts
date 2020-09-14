import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  phoneNumber:string;
  otp:string;
  phoneSignIn = false
  phone
  email =""
  password =""
  errorMessage = ""
  error: {name: string, message: string} = { name: "", message: ""}

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  clearErrorMessage(){
    this.errorMessage = "";
    this.error = { name: '', message: ''};
  }

  login(){
    this.clearErrorMessage();

    if(this.validateForm(this.email,this.password)){
      this.authService.loginEmail(this.email, this.password)
    .then(() => {
      this.router.navigate(['/home'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
    }
  }

  validateForm(email, password){
    if(email.length === 0){
      this.errorMessage = "Please Enter Email Address";
      return false;
    }
    if(password.length === 0){
      this.errorMessage = "Please Enter Password";
      return false;
    }

    this.errorMessage = "";
    return true;
  }

  loginG(){
    this.authService.GoogleAuth();
  }

  loginF(){
    this.authService.FacebookAuth()
  }

  phoneSignin(){
    this.phoneSignIn = !this.phoneSignIn;
  }

}
