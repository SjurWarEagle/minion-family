import { DnaRandomizerService } from './dna-randomizer.service';
import { TreeGeneratorService } from './tree-generator.service';

describe('Family generator', () => {
  let treeGeneratorService: TreeGeneratorService;
  const dnaRandomizerService: DnaRandomizerService = new DnaRandomizerService();

  beforeEach(() => {
    treeGeneratorService = new TreeGeneratorService(dnaRandomizerService);
    expect(treeGeneratorService).toBeDefined();
  });

  it('basic initialization', () => {
    const minion = dnaRandomizerService.generateMinion();
    expect(minion).toBeDefined();
  });

  it('generate something', async done => {
    const minion = dnaRandomizerService.generateMinion();
    expect(minion).toBeDefined();
    let familyTree = await treeGeneratorService.generate(0, 1);
    expect(familyTree).toBeDefined();
    done();
  });
});
