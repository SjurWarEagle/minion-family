import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MinionDna } from '../../model/minion-dna';

@Component({
  selector: 'app-minion-display',
  templateUrl: './minion-display.component.html',
  styleUrls: ['./minion-display.component.scss'],
})
export class MinionDisplayComponent {
  private minionDnaString: string;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  set minionDnaToShow(minionDna: MinionDna) {
    this.minionDnaString = JSON.stringify(minionDna);
  }

  constructor() {}

}
