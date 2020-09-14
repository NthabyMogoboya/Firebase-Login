import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  loginEmail(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email,password)
    .then((user) => {
      this.authState = user
    })
    .catch(error => {
      console.log(error)
      throw error
    })
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider){
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      console.log('Login Successful')
    }).catch((error) => {
      console.log(error)
    })
  }

  // Sign in with Facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Auth logic to run auth providers
  AuthFacebook(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }
}
