import { Component, OnInit } from '@angular/core';
import { ConnectivityService } from 'src/app/services/connectivity.service';
import config from './../../services/connectivity.config.json';

@Component({
  selector: 'app-test-communication',
  templateUrl: './test-communication.component.html',
  styleUrls: ['./test-communication.component.scss']
})
export class TestCommunicationComponent implements OnInit {

  isConnected:boolean = false;
  connectorCreated: boolean = false;
  testCompleted: boolean = false;
  interactionCreated: boolean = false;
  pendingResponse: boolean = false;

  graphPattern: string = "?a <http://example.org/isRelatedTo> ?b .";
  bindingSet: string = `[{"a":"12","b":"23","c":"34"}]`;
  knowledgeBaseId: string = "";
  askRepose: string = "";

  constructor(private cService: ConnectivityService) {}

  ngOnInit(): void {
    this.knowledgeBaseId = config.knowledgeBaseId;
  }

  testConnect() {
    this.cService.serviceStoreLogin(() => {
      this.isConnected = true;
      this.cService.smartConnectorCreate(() => {
        this.connectorCreated = true;
      });
    });
  }

  testRegisterInteraction() {
    this.cService.smartConnectorRegisterInteraction(this.graphPattern, (success: any) => {
      if (success) {
        this.interactionCreated = true;
      }
    });
  }

  testAsk() {
    this.pendingResponse = true;
    this.cService.smartConnectorInteractionAsk(JSON.parse(this.bindingSet), (data: any) => {
      this.pendingResponse = false;
      this.askRepose = JSON.stringify(data);
      this.testCompleted = true;
    });
  }
}
