import { Injectable } from '@angular/core';
import { FamilyTree } from '../model/family-tree';
import { DnaRandomizerService } from './dna-randomizer.service';

@Injectable({
  providedIn: 'root'
})
export class TreeGeneratorService {
  constructor(private dnaRandomizerService: DnaRandomizerService) {}

  public async generate(level: number, nrChildren: number): Promise<FamilyTree> {
    // console.log('level', level);
    // console.log('nrChildren', nrChildren);
    const rc = new FamilyTree();

    //TODO change to dna-logic
    rc.female = await this.dnaRandomizerService.generateMinion();
    rc.male = await this.dnaRandomizerService.generateMinion();

    if (level < 5) {
      //don't generate too many levels, just start with a small tree.
      for (let cnt = 0; cnt < nrChildren; cnt++) {
        await this.generate(level + 1, 2);
      }
    }

    return rc;
  }
}
