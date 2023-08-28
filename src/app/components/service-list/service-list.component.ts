import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { CARD_TYPE, LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  
constructor(private cService: ConnectivityService,private layoutService: LayoutService){}

  displayedColumns: string[] = [];
  dataSource: any[] = [];

  ngOnInit(): void {
    this.cService.serviceStoreListServices((data: any) => {
      this.displayedColumns = Object.keys(data[0]);
      this.dataSource = this.formatData(data);
    });
  }

  getColumnHeader(col: any) {
    switch(col) {
      case 'serviceID': { return 'SID' }
      default: { return col };
    }
  }

  formatData(data: any[]) {
    return data.map(r => {
      this.displayedColumns.forEach(p => {
        if (p == 'registerDate') r[p] = new Date(r[p]).toLocaleDateString();
        else if (p == 'expirationDate') r[p] = new Date(r[p]).toLocaleDateString();
      });
      return r;
    });
  }

  showDetails(data:any){
    console.log(data)
    this.layoutService.addCard(CARD_TYPE.SERVICE_DETAILS,data.name,data);
  }
}