import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AddTransactionPage } from '../add-transaction/add-transaction';

import { Transaction } from '../../providers/transaction';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lastTransactions;

  constructor(public navCtrl: NavController, private transaction: Transaction) {

  }

  ionViewWillEnter() {
    this.transaction.getLastTransactions().subscribe(transactions => {
      this.lastTransactions = transactions;
    }, error => {
      console.log(error);
    });
  }

  public addTransaction(): void {
    this.navCtrl.push(AddTransactionPage);
  }

}
