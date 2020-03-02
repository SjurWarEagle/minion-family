import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  public loadingIcon = faClock;

  constructor() {}

  public ngOnInit(): void {}
}
