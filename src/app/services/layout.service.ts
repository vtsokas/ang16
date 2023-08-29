import { Injectable } from '@angular/core';
import { MyDashboardComponent } from '../components/my-dashboard/my-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  dashboardComponent?: MyDashboardComponent;

  constructor() { }

  registerDashboardComponent(c: MyDashboardComponent) {
    this.dashboardComponent = c;
  }

  addCard(type: CARD_TYPE, title:string, value?:any) {
    this.dashboardComponent?.addCard({
      type:type,
      title: title,
      value:value,
      rows: 3,
      cols: 1
    });
  }

  clearCards() {
    this.dashboardComponent!.cards = [];
  }
}

export enum CARD_TYPE
{
  SERVICE_LIST,
  SERVICE_DETAILS,
  MEASUREMENTS,
  DEVICE_DETAILS,
  TEST_COMMUNICATION
}
