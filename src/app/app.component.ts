import { Component, OnInit } from '@angular/core';
import { faTh, faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public minionWallIcon = faTh;
  public minionCustomizerIcon = faTools;

  public ngOnInit(): void {}

  constructor() {}
}
