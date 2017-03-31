import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';

import { Auth } from '../providers/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  constructor(platform: Platform, private auth: Auth, private menuCtrl: MenuController) {
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

  public goToSubscriptions(): void
  {
    this.menuCtrl.close();
    this.nav.push(SubscriptionsPage);
  }
}
