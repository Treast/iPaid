import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NavController } from 'ionic-angular';

import { AddTransactionPage } from '../add-transaction/add-transaction';

import { Transaction } from '../../providers/transaction';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lastTransactions;

  public sum: number = 0;
  public chartLabels: string[] = [];
  public chartData: any = [];
  public chartColors: any = [{
    backgroundColor: 'rgba(189, 195, 199, 0.3)',
    borderColor: 'rgba(189, 195, 199, 1.0)',
    pointBackgroundColor: 'rgba(255, 255, 255, 1)',
    pointBorderColor: 'rgba(255, 255, 255, 1)',
    pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
    pointHoverBorderColor: 'rgba(255, 255, 255, 1)'
  }];
  public chartOptions = {
    legend: { labels: { fontColor: "white"} },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "white",
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: "white",
          beginAtZero: true
        }
      }]
    }
  }
  public loaded = false;
  public chartType: string = 'line';

  public beginDate: Date;
  public endDate: Date;

  constructor(public navCtrl: NavController, private transaction: Transaction, private datePipe: DatePipe) {

  }

  private getMonday(date: Date) {
    var day = date.getDay() || 7;
    if (day !== 1)
      date.setHours(-24 * (day - 1));
    return date;
  }

  ionViewWillEnter() {
    this.sum = 0;
    this.beginDate = this.getMonday(new Date());
    this.endDate = new Date(this.beginDate.getTime());
    this.endDate.setDate(this.endDate.getDate() + 7);

    this.transaction.getTransactionsBetween(this.beginDate, this.endDate).subscribe(transactions => {
      transactions.subscribe(ts => {
        this.lastTransactions = ts;
        console.log('Transactions', ts);

        this.initializeDaysLabels();
        this.placeTransactions();
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

  public initializeDaysLabels() {
    let current = this.beginDate;
    this.chartLabels = [];
    while (current <= this.endDate) {
      this.chartLabels.push(this.datePipe.transform(current, 'EEE'));
      current.setDate(current.getDate() + 1);
    }
  }

  public placeTransactions() {
    this.loaded = false;

    this.chartData = [{
      data: new Array(this.chartLabels.length + 1).join('0').split('').map(parseFloat),
      label: "",
    }];

    this.lastTransactions.forEach(transaction => {
      let dateTransaction = new Date(transaction.paid_at);
      let day = this.datePipe.transform(dateTransaction, 'EEE');
      let index = this.chartLabels.indexOf(day);
      this.chartData[0].data[index] += parseFloat(transaction.amount);
      this.sum += parseFloat(transaction.amount);
    });
    this.loaded = true;
  }

  public addTransaction(): void {
    this.navCtrl.push(AddTransactionPage);
  }

}
