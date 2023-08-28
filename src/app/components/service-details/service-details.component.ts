import { Component, Input, OnInit } from '@angular/core';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import { CARD_TYPE, LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {
  
  constructor(private cService: ConnectivityService,private layoutService: LayoutService){}
  
   @Input() data:any;


  
    ngOnInit(): void {
      // this.cService.serviceStoreListServices((data: any) => {
      //   this.displayedColumns = Object.keys(data[0]);
      //   this.dataSource = this.formatData(data);
      // });
    }
  }