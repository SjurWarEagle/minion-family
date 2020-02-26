import { Injectable } from '@angular/core';
import { MinionDna } from '../model/minion-dna';
import { Chance } from 'chance';
import * as chroma from 'chroma-js';

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
    dna.hairType = this.chance.integer({ min: 0, max: 2 });
    dna.twoEyes = this.chance.bool({ likelihood: 80 });
    dna.onlyUnderwear = this.chance.bool({ likelihood: 3 });

    const irisRadius = this.chance.floating({ min: 2, max: 5 });
    const eyeRadius = this.chance.floating({ min: 15, max: 22 });
    const irisShift = this.chance.floating({ min: 0, max: 6 });

    //grayscale pupils, color ones looked strange
    // maybe add them later with a low chance
    let color = '#FFFFFF';
    while (chroma(color).luminance() > 0.25) {
      color = chroma.random().hex();
      // color = chroma
      //   .random()
      //   .desaturate(255)
      //   .hex();
    }

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
