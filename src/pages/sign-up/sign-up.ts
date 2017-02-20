import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Auth } from '../../providers/auth';

/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  email: String = "";
  password: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: Auth) {}

  public signUpWithEmail() {
    this.auth.signInWithEmail({
      email: this.email,
      password: this.password
    }).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}
