import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from './connectivity.config.json';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  keyrockAccessToken: any;
  keyrockBaseAuthentication = config.keyrockBaseAuth;//'';
  serviceStoreAccessToken: any;

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return !!localStorage.getItem('keyrock_access_token');
  }

  logout() {
    localStorage.removeItem('keyrock_access_token');
    window.location.reload();
  }

  keyrockLogin(username: string, password: string, callback: Function) {
    this.http.post<any>('/oauth2/token', `grant_type=password&username=${encodeURIComponent(username)}&password=${password}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + this.keyrockBaseAuthentication
      }
    }).subscribe(data => {
      if (!!data.access_token) {
        this.keyrockAccessToken = data.access_token;
        localStorage.setItem('keyrock_access_token', this.keyrockAccessToken);
      }
      callback(this.keyrockAccessToken != null);
    });
  }

  orionGetAll(callback: Function) {
    if (!this.serviceStoreAccessToken) {
      this.serviceStoreLogin(() => {
        this.http.get<any>('/v2/entities', {
          headers: {
            'X-Auth-Token': this.keyrockAccessToken
          }
        }).subscribe(r => {
          callback(r);
        })
      });
    } else {
      this.http.get<any>('/v2/entities', {
        headers: {
          'X-Auth-Token': this.keyrockAccessToken
        }
      }).subscribe(r => {
        callback(r);
      })
    }

  }

  serviceStoreLogin(callback: Function) {
    this.http.post<any>('/servicestore/login', `{"email":"${config.serviceStoreUser}","password":"${config.serviceStorePass}"}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(r => {
      callback();
    });
  }

  serviceStoreListServices(callback: Function) {
    if (!this.serviceStoreAccessToken) {
      this.serviceStoreLogin(() => {
        this.http.get<any>('servicestore/service-list').subscribe(r => {
          callback(r);
        });
      });
    } else {
      this.http.get<any>('servicestore/service-list').subscribe(r => {
        callback(r);
      });
    }
  }
}
