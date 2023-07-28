import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit {

  ngOnInit(): void {
    this.cardsChanged.emit(this.cards);
  }

  get cardsCount() {
    let c = 0;
    this.cards.forEach(ca => { c += ca.cols });
    return c;
  }

  @Input() gridWidth: string = "";
  @Output() cardsChanged = new EventEmitter<any[]>();
  @Input() teamData: any[]=[];


  /** Based on the screen size, switch from standard to one column per row */
  cards = [
    { type: CARD_TYPE.LEADERBOARD, title: 'Card 1', cols: 1, rows: 3 },
    // { title: 'Card 2', cols: 1, rows: 3 },
    // { title: 'Card 3', cols: 1, rows: 3 },
    // { title: 'Card 4', cols: 1, rows: 3 },
    // { title: 'Card 3', cols: 1, rows: 3 },
    // { title: 'Card 4', cols: 1, rows: 3 },
    // { title: 'Card 3', cols: 1, rows: 3 },
    // { title: 'Card 4', cols: 1, rows: 3 },
    // { title: 'Card 4', cols: 1, rows: 1 }
  ];

  expandCard(card: any) {
    this.cards.find(c => c.title == card.title)!.cols = 3;//?.cols = 2;
    this.cardsChanged.emit(this.cards);
  }
  collapseCard(card: any) {
    this.cards.find(c => c.title == card.title)!.cols = 1;//?.cols = 2; 
    this.cardsChanged.emit(this.cards);
  }

  removeCard(card: any) {
    this.cards.splice(this.cards.indexOf(card), 1);
    this.cardsChanged.emit(this.cards);
  }
}

enum CARD_TYPE
{
  LEADERBOARD,
  RESULTS,
  ANALYSIS
}