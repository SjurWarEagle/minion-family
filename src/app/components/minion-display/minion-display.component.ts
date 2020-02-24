import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {DnaRandomizerService} from '../../services/dna-randomizer.service';
import {MinionDna, MinionDnaEye} from '../../model/minion-dna';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as chroma from 'chroma-js';

@Component({
  selector: 'app-minion-display',
  templateUrl: './minion-display.component.html',
  styleUrls: ['./minion-display.component.scss']
})
export class MinionDisplayComponent implements AfterViewInit {
  @ViewChild('dataContainer', {static: true})
  public dataContainer: ElementRef;

  private minionDna: MinionDna;
  private svg: HTMLElement | any;

  constructor(private http: HttpClient, private dnaRandomizerService: DnaRandomizerService) {
  }

  public ngAfterViewInit(): void {
    this.loadImage().catch(console.error);
  }

  private async loadImage(): Promise<void> {
    const headers = new HttpHeaders();
    headers.set('Accept', 'image/svg+xml');
    // noinspection UnnecessaryLocalVariableJS
    const content = await this.http
      .get('./assets/minions-svgrepo-com.svg', {
        headers,
        responseType: 'text'
      })
      .toPromise();
    // console.log('content=', content);
    this.dataContainer.nativeElement.innerHTML = content;
    this.minionDna = await this.dnaRandomizerService.generateMinion();

    this.svg = (this.dataContainer.nativeElement as HTMLElement).children.item(0) as HTMLElement | any;

    // const svg = (this.dataContainer.nativeElement as HTMLElement).children.item(0) as SVGElement;
    // console.log('svg', svg);

    if (this.minionDna.twoEyes) {
      this.setEyes(
        this.svg.getElementById('eyeRight'),
        this.svg.getElementById('eyeLeft'),
        this.minionDna.eyeRight,
        this.minionDna.eyeLeft
      );
      this.setPupilTwoEyes(this.svg.getElementById('pupilLeft'), this.minionDna.eyeLeft);
      this.setPupilTwoEyes(this.svg.getElementById('pupilRight'), this.minionDna.eyeRight);

      this.svg.getElementById('groupSingleEye').remove(0);
    } else {
      this.setEye(this.svg.getElementById('eye'), this.minionDna.eyeRight);
      this.setPupilSingleEye(this.svg.getElementById('pupil'), this.minionDna.eye);
      this.svg.getElementById('groupDoubleEyes').remove();
    }

    if (!this.minionDna.pocket) {
      this.svg.getElementById('pocket').remove();
    }

    this.setMouth(this.svg.getElementById('mouth'), this.minionDna.mood);
    this.setSkinColor(this.minionDna);
    this.setHair(this.minionDna.hairType);
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

  private setSkinColor(minionDna: MinionDna) {
    // minion original color: fce029
    const colorScale = chroma.scale(['fce029', 'fcc629']).domain([0, 100]);
    const color = colorScale(minionDna.skinColor).hex();
    // console.log('color',color);

    this.svg.getElementById('skinHead').style.fill = color;
    this.svg.getElementById('skinBodyRight').style.fill = color;
    this.svg.getElementById('skinArmRight').style.fill = color;
    this.svg.getElementById('skinBodyLeft').style.fill = color;
    this.svg.getElementById('skinArmLeft').style.fill = color;
    this.svg.getElementById('skinLegs').style.fill = color;

    if (!this.minionDna.shoes) {
      this.svg.getElementById('shoeLeft').style.fill = color;
      this.svg.getElementById('shoeRight').style.fill = color;
    }

    if (!this.minionDna.gloves) {
      this.svg.getElementById('gloveLeft').style.fill = color;
      this.svg.getElementById('gloveRight').style.fill = color;
    }
  }

  private setPupilTwoEyes(pupilLeft, minionDna: MinionDnaEye): void {
    pupilLeft.setAttribute('r', minionDna.irisRadius.toString());
    pupilLeft.setAttribute('cx', Number.parseFloat(pupilLeft.getAttribute('cx')) + minionDna.pupilShift);
    pupilLeft.style.fill = minionDna.color;
    pupilLeft.style.stroke = minionDna.color;
  }

  private setPupilSingleEye(pupilLeft, minionDna: MinionDnaEye): void {
    pupilLeft.setAttribute('r', minionDna.irisRadius.toString());
    // pupilLeft.setAttribute('cy', Number.parseFloat(pupilLeft.getAttribute('cy')) + minionDna.pupilShift);
    pupilLeft.style.fill = minionDna.color;
    pupilLeft.style.stroke = minionDna.color;
  }

  private setEye(pupil, eye: MinionDnaEye): void {
    pupil.setAttribute('r', eye.eyeRadius.toString());
  }

  private setHair(hair: number): void {
    switch (hair) {
      case 0:
        this.svg.getElementById('hairSpiked').remove();
        this.svg.getElementById('hairSprout').remove();
        break;
      case 1:
        this.svg.getElementById('hairSprout').remove();
        break;
      case 2:
        this.svg.getElementById('hairSpiked').remove();
        break;
      default:
        console.log(`Hair ${hair} unkown.`);

    }

  }

  private setEyes(pupilLeft, pupilRight, leftEye: MinionDnaEye, rightEye: MinionDnaEye): void {
    pupilLeft.setAttribute('r', leftEye.eyeRadius.toString());
    pupilRight.setAttribute('r', rightEye.eyeRadius.toString());
  }
}
