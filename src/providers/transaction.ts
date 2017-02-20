import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFire } from 'angularfire2';

/*
  Generated class for the Transaction provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Transaction {

  constructor(public http: Http, private angularFire: AngularFire) {
  }

  public getCategories(): Observable<any> {
    return this.angularFire.database.list('/categories');
  }
  public getColors(): Observable<any> {
    return this.angularFire.database.list('/colors');
  }

}
