import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  data:any[]=[];

 
  _dash?: MyDashboardComponent;
  @ViewChild(MyDashboardComponent) set dash(d: MyDashboardComponent) {
    this._dash = d;
  }

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    // let h = new HttpHeaders();
    // h.set('X-Auth-Token', '244170dde2ec47d49a2d7b8c283ab081');
    this.http.get<any>('/v4/teams',{headers: {
      'X-Auth-Token': '244170dde2ec47d49a2d7b8c283ab081'
    }}).subscribe(data => {
        this.data=data.teams;
        //this.postId = data.id;
        console.log(data);
    })
  }

  title = 'my-project';

  dashboardWidth: string = '';
  toolbarWidth: string = '';
  dashboardCards: any[] = [];
  dashboardCardsChanged(cards: any[]) {
    this.dashboardCards = cards;

    var cardsCount = 0;
    cards.forEach(c => { cardsCount += c.cols });
    this.dashboardWidth = (cardsCount * 610).toString() + 'px';
    this.toolbarWidth = (cardsCount * 610 + 20).toString() + 'px';
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: 'a', animal: 'b' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  addCard() {
    this._dash?.cards.push(this._dash?.cards[0]);
    this.dashboardCardsChanged(this._dash?.cards || this.dashboardCards);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <h1 mat-dialog-title>Hi {{data.name}}</h1>
  <div mat-dialog-content>
    <p>What's your favorite animal?</p>
    <mat-form-field>
      <mat-label>Favorite Animal</mat-label>
      <input matInput [(ngModel)]="data.animal">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
  </div>
  `,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  animal: string;
  name: string;
}