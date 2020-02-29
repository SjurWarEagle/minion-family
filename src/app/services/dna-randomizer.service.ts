import { Injectable } from '@angular/core';
import { MinionDna } from '../model/minion-dna';
import { Chance } from 'chance';
import * as chroma from 'chroma-js';
import { DnaGenerationParameters } from '../model/dna-generation-parameter';

@Injectable({
  providedIn: 'root'
})
/**
 * Generates the DNA for a minion by random values.
 * The values are within a reasonable range,
 * so that e.g. the eyes are not overlapping and such,
 * but the outcome is random.
 */
export class DnaRandomizerService {
  private chance = new Chance();

  constructor() {}

  public async generateMinion(dnaGenerationParameters?: DnaGenerationParameters): Promise<MinionDna> {
    const dna = new MinionDna();
    dna.name = this.chance.name();

    dna.pocket = this.chance.bool({ likelihood: 80 });
    dna.gloves = this.chance.bool({ likelihood: 80 });
    dna.shoes = this.chance.bool({ likelihood: 80 });
    dna.mood = this.chance.floating({ min: -75, max: 100 });
    dna.skinColor = this.chance.integer({ min: 0, max: 100 });
    dna.hairType = this.chance.integer({ min: 0, max: 2 });
    dna.twoEyes = this.chance.bool({ likelihood: 80 });
    dna.onlyUnderwear = this.chance.bool({ likelihood: 3 });
    dna.holdsItem = this.chance.bool({ likelihood: 20 });
    if (dna.holdsItem) {
      dna.itemInHand = this.chance.integer({ min: 1, max: 4 });
    }

    const irisRadius = this.chance.floating({ min: 2, max: 5 });
    const eyeRadius = this.chance.floating({ min: 15, max: 22 });
    const irisShift = this.chance.floating({ min: 0, max: 6 });

    //grayscale pupils, color ones looked strange
    // maybe add them later with a low chance
    let color = '#FFFFFF';
    while (chroma(color).luminance() > 0.25) {
      if (dnaGenerationParameters && dnaGenerationParameters.allowColoredEyes) {
        color = chroma.random().hex();
      } else {
        color = chroma
          .random()
          .desaturate(255)
          .hex();
      }
      // console.log(chroma(color).luminance());
      // console.log('color',color);
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
