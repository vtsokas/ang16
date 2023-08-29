import { Component, OnInit } from '@angular/core';
import { CARD_TYPE, LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    
  }

  isChecked: boolean = true;
  
  addMeasurements(type: string) {
    this.layoutService.addCard(CARD_TYPE.MEASUREMENTS, `Measurements (${type})`, type);
  }
}
