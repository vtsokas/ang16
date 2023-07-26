import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  _dash?: MyDashboardComponent;
  @ViewChild(MyDashboardComponent) set dash(d: MyDashboardComponent) {
    this._dash = d;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // let h = new HttpHeaders();
    // h.set('Authorization', 'Basic YTEwM2IxYjEtYzM2OC00ZmU1LTgyMDQtMDQxZWY4ZmI4MTNlOmUyODZmMzFiLTQ5MjgtNGE3My1iNGNlLWZlOGJiZmQ2OThlZg==');
    // this.http.post<any>('http://localhost:3005/oauth2/token', { grant_type: 'password', username: 'a', password:'q' }, {headers: {
    //   'Authorization': 'Basic YTEwM2IxYjEtYzM2OC00ZmU1LTgyMDQtMDQxZWY4ZmI4MTNlOmUyODZmMzFiLTQ5MjgtNGE3My1iNGNlLWZlOGJiZmQ2OThlZg==',
    //   'Access-Control-Allow-Origin': 'localhost:4200'
    // }}).subscribe(data => {
    //     //this.postId = data.id;
    // })
  }

  title = 'my-project';
  
  dashboardWidth: string = '';
  toolbarWidth: string = '';
  dashboardCards: any[] = [];
  dashboardCardsChanged(cards: any[]){
    this.dashboardCards = cards;

    var cardsCount = 0;
    cards.forEach(c => { cardsCount += c.cols });
    this.dashboardWidth = (cardsCount * 610).toString() + 'px';
    this.toolbarWidth = (cardsCount * 610 + 20).toString() + 'px';
  }

  addCard() {
    this._dash?.cards.push(this._dash?.cards[0]);
    this.dashboardCardsChanged(this._dash?.cards || this.dashboardCards);
  }
}
