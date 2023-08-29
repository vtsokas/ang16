import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-communication',
  templateUrl: './test-communication.component.html',
  styleUrls: ['./test-communication.component.scss']
})
export class TestCommunicationComponent implements OnInit {

  isConnected:boolean = false;
  testCompleted: boolean = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  testConnect() {
    setTimeout(() => {
      this.isConnected = true;
    }, 1000);
  }

  testAsk() {
    setTimeout(() => {
      this.testCompleted = true;
    }, 4000);
  }
}
