import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-minion-panel',
  templateUrl: './minion-panel.component.html',
  styleUrls: ['./minion-panel.component.scss'],
})
export class MinionPanelComponent implements OnInit, OnChanges {
  @Input()
  public pixelHeight: number = 768;
  @Input()
  public pixelWidth: number = 1024;
  @Input()
  public nrMinionsHeight: number = 5;
  @Input()
  public nrMinionsWidth: number = 5;
  @Input()
  public svgContent: string;

  public sizeOfMinionHeight: number = 200;
  public sizeOfMinionWidth: number = 200;
  public cntArray: number[] = [0];

  constructor() {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.resetMinions();
  }

  public ngOnInit(): void {}

  private resetMinions(): void {
    this.cntArray = undefined;
    setTimeout(() => {
      const tmpCounter = this.nrMinionsHeight * this.nrMinionsWidth;
      this.cntArray = Array(tmpCounter).fill(0);
      this.sizeOfMinionHeight = this.pixelHeight / this.nrMinionsHeight;
      this.sizeOfMinionWidth = this.pixelWidth / this.nrMinionsWidth;
    });
  }
}
