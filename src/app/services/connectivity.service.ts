import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  keyrockAccessToken: any;
  keyrockBaseAuthentication = 'NTY4OGQ1OTYtOTE3MS00NTZlLWJmNTgtYzhlNzM5YTA3MDY2OjM2MWMzMmNlLTVjZWUtNDE0Yi04NDllLWRkYjMyY2VhMzE1MQ==';

  constructor(private http: HttpClient) { }

  keyrockLogin(username: string, password: string, callback: Function) {
    this.http.post<any>('/oauth2/token',`grant_type=password&username=${encodeURIComponent(username)}&password=${password}`,{headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + this.keyrockBaseAuthentication
    }}).subscribe(data => {
        if (!!data.access_token) {  
          this.keyrockAccessToken = data.access_token;                 
        }
        callback(this.keyrockAccessToken != null);
    });
  }

  orionGetAll(callback: Function) {
    this.http.get<any>('/v2/entities',{headers: {
      'X-Auth-Token': this.keyrockAccessToken}}).subscribe(r => {
        callback(r);
      })
  }

  serviceStoreLogin() {
    this.http.post<any>('/servicestore/login', '{"email":"set@hpc.bg","password":"asdfiuY12#"}',{headers: {
      'Content-Type': 'application/json'
    }}).subscribe(r => {
      this.serviceStoreListServices();
    });
  }

  serviceStoreListServices() {
    this.http.get<any>('servicestore/service-list').subscribe(r => {
      console.log(r);
    });
  }
}
