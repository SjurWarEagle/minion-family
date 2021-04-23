import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MinionDna } from '../../model/minion-dna';
import { environment } from '../../../environments/environment';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-minion-display',
  templateUrl: './minion-display.component.html',
  styleUrls: ['./minion-display.component.scss'],
})
export class MinionDisplayComponent {
  public minionDnaString: string;
  public path;

  @Input()
  public size;

  @Input()
  set minionDnaToShow(minionDna: MinionDna) {
    this.minionDnaString = JSON.stringify(minionDna);
    this.minionDnaString=this.minionDnaString.trim();
    this.path = environment.pathApi;
  }

  constructor() {}

}
