import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinionDna } from '../../model/minion-dna';

@Component({
  selector: 'app-single-minon-customize',
  templateUrl: './single-minon-customize.component.html',
  styleUrls: ['./single-minon-customize.component.scss'],
})
export class SingleMinonCustomizeComponent implements OnInit {
  @Input()
  public minionDna: MinionDna;

  @Output()
  public minionDnaChanged: EventEmitter<MinionDna> = new EventEmitter<MinionDna>();

  public exeColorR: number = 100;
  public exeColorG: number = 100;
  public exeColorB: number = 100;

  private triggerUpdateEyeColor(): void {
    this.triggerUpdate();
  }

  private triggerUpdate(): void {
    this.minionDna.eye.color = this.exeColorR * 0xffff + this.exeColorG * 0xff + this.exeColorB;
    this.minionDnaChanged.emit(this.minionDna);
  }

  constructor() {}

  public ngOnInit(): void {}

  public eyesChanged(event: string): void {
    if (!event) {
      return;
    }
    if (event === '1') {
      this.minionDna.twoEyes = false;
    } else if (event === '2') {
      this.minionDna.twoEyes = true;
    }

    this.triggerUpdate();
  }
}
