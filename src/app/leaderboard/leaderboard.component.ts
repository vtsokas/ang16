import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  displayedColumns: string[] = Object.keys(new LeaderboardItem());
  @Input() dataSource: any[] = [];
}

export class LeaderboardItem {
  crest: string = '';
  name: string = '';
  points: number = 0;
  won: number = 0;
  lost: number = 0;
  draw: number = 0;
  goalDifference: number = 0;
}
