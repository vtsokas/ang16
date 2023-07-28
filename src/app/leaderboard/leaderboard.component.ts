import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  displayedColumns: string[] = Object.keys(new LeaderboardItem());
  dataSource: LeaderboardItem[] = [{
    position: 1, name: 'Liverpool', points: 12, won: 4, lost: 0, draw: 0, goalDifference: 0
  }];
}

export class LeaderboardItem {
  position: number = 0;
  name: string = '';
  points: number = 0;
  won: number = 0;
  lost: number = 0;
  draw: number = 0;
  goalDifference: number = 0;
}
