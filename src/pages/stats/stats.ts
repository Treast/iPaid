import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

import { Transaction } from '../../providers/transaction';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/last';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  public transactions = [];
  public categories = [];

  public selectedCategory: any;

  public chartLabels: string[] = [];
  public chartData: any = [];
  public chartColors: any = [{
    backgroundColor: []
  }];
  public loaded = false;
  public chartType: string = 'line';

  public beginDate: Date;
  public endDate: Date;
  public hasValue: boolean = false;
  public chartOptions: any = {
    responsive: true,
    defaultFontColor: '#FFF',
    legend: {
      labels: {
        fontColor: '#FFF',
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "#FFF", // this here
        },
      }],
      yAxes: [{
        ticks: {
          fontColor: "#FFF", // this here
        },
      }],
    }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private transaction: Transaction, private datePipe: DatePipe) {
    this.loaded = false;
    this.transaction.getLastTransactions().subscribe(transactions => {
      transactions.subscribe(ts => {
        this.transactions = ts;
        this.transactions.forEach((transaction, index) => {
          this.chartData[transaction.category_key] += parseInt(transaction.amount);
        });
        console.log('Transactions', this.transactions);
        this.beginDate = new Date(this.transactions[0].paid_at);
        this.endDate = new Date(this.transactions[this.transactions.length - 1].paid_at);
        this.getMonths(this.beginDate, this.endDate);
      });
    }, error => {
      console.log(error);
    });
    this.transaction.getCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      this.placeTransactions();
    }, error => {
      console.log(error);
    });
  }

  public placeTransactions() {
    this.loaded = false;
    this.hasValue = false;
    console.log('Labels', this.chartLabels);
    this.chartData = [{
      data: new Array(this.chartLabels.length + 1).join('0').split('').map(parseFloat),
      label: this.selectedCategory.name,
    }];
    this.transactions.forEach(transaction => {
      if (transaction.category_key == this.selectedCategory.$key) {
        console.log('T', transaction);
        this.hasValue = true;
        let dateTransaction = new Date(transaction.paid_at);
        let month = this.datePipe.transform(dateTransaction, 'MMM y');
        let index = this.chartLabels.indexOf(month);
        this.chartData[0].data[index] += parseFloat(transaction.amount);
      }
    });
    this.loaded = true;
  }

  public getMonths(beginDate: Date, endDate: Date) {
    let begin = new Date(beginDate.getFullYear(), beginDate.getMonth(), 1);
    let end = new Date(endDate.getFullYear(), endDate.getMonth(), 31);

    let current = begin;

    this.chartLabels = [];
    while (current <= end) {
      this.chartLabels.push(this.datePipe.transform(current, 'MMM y'));
      current.setMonth(current.getMonth() + 1);
    }
  }

  public selectCategory(category): void {
    this.selectedCategory = category;
    this.chartColors[0].backgroundColor = category.color;
    console.log('Color', this.chartColors);
    this.placeTransactions();
  }

}
