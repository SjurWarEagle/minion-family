import { Component, OnInit } from '@angular/core';
import { DnaRandomizerService } from '../../services/dna-randomizer.service';
import { MinionDna } from '../../model/minion-dna';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent implements OnInit {
  public currentMinionDna: MinionDna;
  public size: number;

  constructor(private dnaRandomizerService: DnaRandomizerService) {
  }

  public ngOnInit(): void {
    this.dnaRandomizerService.generateMinion().then((dna) => {
      this.currentMinionDna = dna;
    });
  }

  public updateMinionDna(dna: MinionDna): void {
    setTimeout(() => {
      //generate new reference, so that change detection is triggered
      this.currentMinionDna = JSON.parse(JSON.stringify(dna));
    });
  }

  public setSize(newSize: number) {
    this.size = newSize;
  }
}
