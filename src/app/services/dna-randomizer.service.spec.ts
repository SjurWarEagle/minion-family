import { TestBed } from '@angular/core/testing';

import { DnaRandomizerService } from './dna-randomizer.service';

describe('DnaRandomizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DnaRandomizerService = TestBed.get(DnaRandomizerService);
    expect(service).toBeTruthy();
  });
});
