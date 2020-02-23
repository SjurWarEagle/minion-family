import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chance } from 'chance';
import { DnaRandomizerService } from '../../services/dna-randomizer.service';
import { MinionDna, MinionDnaEye } from '../../model/minion-dna';

@Component({
  selector: 'app-minion-display',
  templateUrl: './minion-display.component.html',
  styleUrls: ['./minion-display.component.scss']
})
export class MinionDisplayComponent implements AfterViewInit {
  @ViewChild('dataContainer', { static: false }) dataContainer: ElementRef;
  private chance = new Chance();
  private minionDna: MinionDna;
  private svg: HTMLElement | any;

  constructor(private http: HttpClient, private dnaRandomizerService: DnaRandomizerService) {}

  public ngAfterViewInit(): void {
    this.loadImage().catch(console.error);
  }

  private async loadImage(): Promise<string> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    const content = await this.http
      .get('./assets/minions-svgrepo-com.svg', {
        headers,
        responseType: 'text'
      })
      .toPromise();
    // console.log('content=', content);
    this.dataContainer.nativeElement.innerHTML = content;
    this.minionDna = await this.dnaRandomizerService.generateMinion();
    setTimeout(() => {
      this.svg = (this.dataContainer.nativeElement as HTMLElement).children.item(0) as HTMLElement | any;

      // setTimeout(() => {
      // const svg = (this.dataContainer.nativeElement as HTMLElement).children.item(0) as SVGElement;
      // console.log('svg', svg);

      this.setPupil(this.svg.getElementById('pupilLeft'), this.minionDna.eyeLeft);
      this.setPupil(this.svg.getElementById('pupilRight'), this.minionDna.eyeRight);
      this.setEye(this.svg.getElementById('eyeRight'), this.minionDna.eyeRight);
      this.setEye(this.svg.getElementById('eyeLeft'), this.minionDna.eyeLeft);

      if (!this.minionDna.pocket) {
        this.svg.getElementById('pocket').remove();
      }

      if (!this.minionDna.shoes) {
        this.svg.getElementById('shoeLeft').style.fill = '#fce029';
        this.svg.getElementById('shoeRight').style.fill = '#fce029';
      }

      if (!this.minionDna.gloves) {
        this.svg.getElementById('gloveLeft').style.fill = '#fce029';
        this.svg.getElementById('gloveRight').style.fill = '#fce029';
      }

      this.setMouth(this.svg.getElementById('mouth'), this.minionDna.mood);
    });

    return '';
  }

  private setMouth(element, mood: number) {
    const d = element.getAttribute('d').toString();
    const dd = d.split(' ');
    // console.log('dd',dd);
    const entry = dd[3].split(',');
    entry[1] = ((30 * mood) / 100).toString();
    // console.log('entry',entry);
    dd[3] = entry.join(',');
    // console.log('dd',dd);
    this.svg.getElementById('mouth').setAttribute('d', dd.join(' '));
  }

  private setPupil(pupilLeft, minionDna: MinionDnaEye) {
    pupilLeft.setAttribute('r', minionDna.irisRadius.toString());
    pupilLeft.setAttribute('cx', Number.parseFloat(pupilLeft.getAttribute('cx')) + minionDna.pupilShift);
    pupilLeft.style.fill = minionDna.color;
    pupilLeft.style.stroke = minionDna.color;
  }

  private setEye(pupilLeft, minionDna: MinionDnaEye) {
    pupilLeft.setAttribute('r', minionDna.eyeRadius.toString());
  }
}
