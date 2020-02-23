import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public nrMinions = [];

  public ngOnInit(): void {
    this.nrMinions = Array(44)
      .fill(0)
      .map((x, i) => i);
  }
}
