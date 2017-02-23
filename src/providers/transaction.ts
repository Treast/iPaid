import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';

import { Auth } from './auth';

@Injectable()
export class Transaction {

  constructor(public http: Http, private angularFire: AngularFire, private auth: Auth) {
  }

  public getCategories(): Observable<any> {
    return this.angularFire.database.list('/categories');
  }
  public getColors(): Observable<any> {
    return this.angularFire.database.list('/colors');
  }

  public addTransaction(transaction): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(data => {
        this.angularFire.database.list('/users/' + data.auth.uid + '/transactions').push({
          name: transaction.name,
          category_key: transaction.category.$key,
          amount: transaction.amount,
          paid_at: transaction.paid_at,
          outcome: transaction.outcome
        }).then(sent => {
          observer.next(sent);
        }).catch(err => {
          observer.error(err);
        });
      }, error => {
        observer.error(error);
      });
    });
  }

  public getLastTransactions(): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(auth => {
        let transactions = this.angularFire.database.list('/users/' + auth.auth.uid + '/transactions').map(transactions => {
          return transactions.map(transaction => {
            transaction.category = this.angularFire.database.object('/categories/' + transaction.category_key);
            return transaction;
          });
        });
        observer.next(transactions);
      }, error => {
        observer.error(error);
      });
    });
  }

  public getTransactionsBetween(startDate: Date, endDate: Date): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(auth => {
        let transactions = this.angularFire.database.list('/users/' + auth.auth.uid + '/transactions', {
          query: {
            orderByChild: 'paid_at',
            startAt: startDate.toISOString(),
            endAt: endDate.toISOString()
          }
        });
        observer.next(transactions);
      }, error => {
        observer.error(error);
      });
    });
  }

}
