import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AddTransactionPage } from '../add-transaction/add-transaction';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public addTransaction(): void {
    this.navCtrl.push(AddTransactionPage);
  }

}
