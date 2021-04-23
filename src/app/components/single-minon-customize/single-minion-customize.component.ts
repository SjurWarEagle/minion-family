import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MinionDna } from '../../model/minion-dna';

@Component({
  selector: 'app-single-minion-customize',
  templateUrl: './single-minion-customize.component.html',
  styleUrls: ['./single-minion-customize.component.scss']
})
export class SingleMinionCustomizeComponent implements OnInit {
  @Input()
  public minionDna: MinionDna;

  @Output()
  public minionDnaChanged: EventEmitter<MinionDna> = new EventEmitter<MinionDna>();

  @Output('size')
  public sizeEmitter = new EventEmitter<number>();
  public size = 512;

  public exeColorR: number = 100;
  public exeColorG: number = 100;
  public exeColorB: number = 100;

  public triggerUpdateEyeColor(): void {
    this.triggerUpdate();
  }

  public updateSpeechtext(event): void {
    console.log('event', event);
    this.minionDna.speechText = event;
    this.triggerUpdate();
  }

  public triggerUpdateSize(event): void {
    if (!event) {
      return;
    }
    this.sizeEmitter.emit(event);
    this.size = event;
  }

  public triggerUpdate(): void {
    if (this.minionDna.twoEyes){
      this.minionDna.eyeLeft.color = this.exeColorR * 0xffff + this.exeColorG * 0xff + this.exeColorB;
      this.minionDna.eyeRight.color = this.exeColorR * 0xffff + this.exeColorG * 0xff + this.exeColorB;
    }else{
      this.minionDna.eye.color = this.exeColorR * 0xffff + this.exeColorG * 0xff + this.exeColorB;
    }
    this.minionDnaChanged.emit(this.minionDna);
  }

  constructor() {
  }

  public ngOnInit(): void {
    this.triggerUpdateSize(512);
  }

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
