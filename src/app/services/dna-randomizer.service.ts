import { Injectable } from '@angular/core';
import { MinionDna } from '../model/minion-dna';
import { Chance } from 'chance';

@Injectable({
  providedIn: 'root'
})
export class DnaRandomizerService {
  private chance = new Chance();

  constructor() {}

  public async generateMinion(): Promise<MinionDna> {
    const dna = new MinionDna();
    // dna.name = 'Tino' + this.chance.integer({ min: 0, max: 9999 }) + '//';
    dna.name = this.chance.name();

    dna.pocket = this.chance.bool({ likelihood: 80 });
    dna.gloves = this.chance.bool({ likelihood: 80 });
    dna.shoes = this.chance.bool({ likelihood: 80 });
    dna.mood = this.chance.floating({ min: -75, max: 100 });
    dna.skinColor = this.chance.integer({ min: 0, max: 100 });
    dna.twoEyes = this.chance.bool({ likelihood: 80 });

    const irisRadius = this.chance.floating({ min: 3, max: 10 });
    const eyeRadius = this.chance.floating({ min: 10, max: 20 });
    const irisShift = this.chance.floating({ min: 0, max: 6 });

    const color = this.chance.color({ grayscale: true });

    dna.eyeLeft = {
      pupilShift: irisShift,
      irisRadius: irisRadius,
      color: color,
      eyeRadius: eyeRadius
    };

    dna.eyeRight = {
      pupilShift: -irisShift,
      irisRadius: irisRadius,
      color: color,
      eyeRadius: eyeRadius
    };

    dna.eye = {
      pupilShift: irisShift,
      irisRadius: irisRadius,
      color: color,
      eyeRadius: eyeRadius
    };

    return dna;
  }
}
