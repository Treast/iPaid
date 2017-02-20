import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../home/home';

import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email: String = "";
  password: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth) {}

  public goToSignUpPage() {
    this.navCtrl.push(SignUpPage);
  }

  public logIn() {
    this.auth.logInWithEmail({
      email: this.email,
      password: this.password
    }).subscribe(data => {
      console.log(data);
      this.navCtrl.setRoot(HomePage);
    }, error => {
      console.error(error);
    });
  }

}
