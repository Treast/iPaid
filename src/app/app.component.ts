import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

import { Auth } from '../providers/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, private auth: Auth) {
    platform.ready().then(() => {
      this.auth.getUserData().subscribe(data => {
        this.rootPage = TabsPage;
      }, error => {
        console.log("Not logged");
      });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
