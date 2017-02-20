import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  user: any;

  constructor(public http: Http, private angularFire: AngularFire) { }

  public signInWithEmail(credentials): Observable<any> {
    return Observable.create(observer => {
      this.angularFire.auth.createUser(credentials).then(data => {
        observer.next(data);
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  public logInWithEmail(credentials): Observable<any> {
    return Observable.create(observer => {
      this.angularFire.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then(data => {
        this.user = data;
        observer.next(data);
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  public getUserData(): Observable<any> {
    return Observable.create(observer => {
      this.angularFire.auth.subscribe(auth => {
        if(auth)
        {
          this.user = auth;
          observer.next(auth);
        } else {
          observer.error();
        }
      }, error => {
        observer.error();
      });
    });
  }

  public logOut(): void {
    this.angularFire.auth.logout();
  }
}
