import { Component, Input, OnInit } from '@angular/core';
import { timestamp } from 'rxjs';
import { ConnectivityService } from 'src/app/services/connectivity.service';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.scss']
})
export class MeasurementListComponent implements OnInit {

  @Input() type: string = "";
  showMockButton: boolean = false;

  constructor(private cService: ConnectivityService){}

  displayedColumns: string[] = [];
  dataSource: any[] = [];

  ngOnInit(): void {
    this.cService.orionGetByType("measurement_" + this.type, (data: any) => {
      if (data.length > 0) {
        this.dataSource = this.formatData(data);
        this.displayedColumns = Object.keys(this.dataSource[0]);
      } else {
        this.showMockButton = true;
      }
    });
  }

  getColumnHeader(col: any) {
    switch(col) {
      default: { return col };
    }
  }

  formatData(data: any[]) {
    return data.map(r => {
      let k = r.id.split("|");
      delete r['id'];
      r['date'] = new Date(+k[2] * 1000).toLocaleDateString();
      r['type'] = r.type.split("_")[1];
      r['timestamp'] = k[2];
      r['sensorId'] = k[0];
      this.displayedColumns.forEach(p => {

      });
      return r;
    });
  }

  mockCounter = 10;
  mockData() {
    if (this.mockCounter == 0) return;
    
    this.cService.orionCreate({
      "id": `iot_sensor_eadbed22-a59b-4728-ad8f-193fc45031e2|msr_${this.type}|${(1693226728 + this.mockCounter).toString()}`,
      "type": "measurement_" + this.type,
      "value": Math.random() * 100   
    }, () => {
      this.mockCounter--;
      this.mockData();
    });
  }
}
