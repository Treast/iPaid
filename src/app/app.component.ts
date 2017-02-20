import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { Auth } from '../providers/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, private auth: Auth) {
    platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        this.rootPage = HomePage;
      }, error => {
        console.log("Not logged");
      });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
