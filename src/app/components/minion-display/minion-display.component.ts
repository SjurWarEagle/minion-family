import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DnaRandomizerService } from '../../services/dna-randomizer.service';
import { MinionDna, MinionDnaEye } from '../../model/minion-dna';
import * as chroma from 'chroma-js';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-minion-display',
  templateUrl: './minion-display.component.html',
  styleUrls: ['./minion-display.component.scss'],
})
export class MinionDisplayComponent {
  @ViewChild('dataContainer', { static: true })
  public dataContainer: ElementRef;

  @ViewChild('container', { static: true })
  public container: ElementRef;

  private _svgContent: string;
  private minionDna: MinionDna;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  set svgContent(content: string) {
    this._svgContent = content;
    setTimeout(() => {
      this.renderData().catch(console.error);
    });
  }

  @Input()
  set minionDnaToShow(minionDna: MinionDna) {
    this.minionDna = minionDna;
    this.renderData();
  }

  private svg: HTMLElement | any;

  private ids = {
    eyeRadiant: '',
  };

  constructor(private dnaRandomizerService: DnaRandomizerService) {}

  private async renderData(): Promise<void> {
    if (!this._svgContent) {
      return;
    }

    this.dataContainer.nativeElement.innerHTML = this._svgContent;
    this.svg = (this.dataContainer.nativeElement as HTMLElement).children.item(0) as HTMLElement | any;
    if (!this.minionDna) {
      this.minionDna = await this.dnaRandomizerService.generateMinion({ allowColoredEyes: true });
    }
    if (this.height && this.width) {
      this.svg.setAttribute('height', this.height.toString());
      this.svg.setAttribute('width', this.width.toString());
    } else {
      // const svgSize = 'calc(100% - 1.5em)';
      const tmp = (this.container.nativeElement as HTMLElement) as HTMLElement | any;

      // const svgSize = Math.min(tmp.getBoundingClientRect().height, tmp.getBoundingClientRect().width) + 'px';
      // console.log('svgSize', svgSize);
      const boundingClientRect = tmp.getBoundingClientRect();
      this.svg.setAttribute('height', boundingClientRect.height);
      this.svg.setAttribute('width', boundingClientRect.width);
    }

    // minion original color: fce029
    const colorScale = chroma.scale(['fce029', 'fcc629']).domain([0, 100]);
    const skinColor = colorScale(this.minionDna.skinColor).hex();
    this.modifyEyes();

    if (!this.minionDna.pocket) {
      if (this.svg.getElementById('pocket')) {
        this.svg.getElementById('pocket').remove();
      }
    }

    this.setMouth(this.svg.getElementById('mouth'), this.minionDna.mood);
    this.setSkinColor(skinColor);
    this.setHair(this.minionDna.hairType);
    this.setCloth(this.minionDna.cloths, skinColor);
    this.setItemInHands('leftHand', this.minionDna.leftHandItem);
    this.setItemInHands('rightHand', this.minionDna.rightHandItem);
  }

  private modifyEyes(): void {
    if (this.minionDna.twoEyes) {
      //TODO use both eyes
      const color = '#' + this.minionDna.eye.color.toString(16);
      this.svg.getElementById('doubleEyesPupilRight').style = `fill:${color} ;stroke:${color} ;stroke-width:0.04412191`;
      this.svg.getElementById('doubleEyesPupilLeft').style = `fill:${color} ;stroke:${color} ;stroke-width:0.04412191`;

      this.setEyes(
        this.svg.getElementById('eyeRight'),
        this.svg.getElementById('eyeLeft'),
        this.minionDna.eyeRight,
        this.minionDna.eyeLeft
      );
      this.setPupilTwoEyes(this.svg.getElementById('doubleEyeLeftPupil'), this.minionDna.eyeLeft);
      this.setPupilTwoEyes(this.svg.getElementById('doubleEyeRightPupil'), this.minionDna.eyeRight);

      this.svg.getElementById('groupSingleEye').remove();
    } else {
      const color = '#' + this.minionDna.eye.color.toString(16);
      this.svg.getElementById('singleEyePupilIris').style = `fill:${color} ;stroke:${color} ;stroke-width:0.04412191`;
      this.setEye(this.svg.getElementById('eye'), this.minionDna.eyeRight);
      this.svg.getElementById('groupDoubleEyes').remove();
    }
  }

  private setMouth(element, mood: number): void {
    return;

    // const d = element.getAttribute('d').toString();
    // const dd = d.split(' ');
    // console.log('dd', dd);
    // const entry = dd[3].split(',');
    // entry[1] = ((30 * mood) / 100).toString();
    // // console.log('entry',entry);
    // dd[3] = entry.join(',');
    // // console.log('dd',dd);
    // this.svg.getElementById('mouth').setAttribute('d', dd.join(' '));
  }

  private setSkinColor(skinColor: string) {
    // console.log('color',color);

    this.svg.getElementById('skinLegs').style.fill = skinColor;
    this.svg.getElementById('skinHead').style.fill = skinColor;
    // this.svg.getElementById('skinBodyRight').style.fill = skinColor;
    this.svg.getElementById('skinArmRight').style.fill = skinColor;
    // this.svg.getElementById('skinBodyLeft').style.fill = skinColor;
    this.svg.getElementById('skinArmLeft').style.fill = skinColor;

    if (!this.minionDna.shoes) {
      this.svg.getElementById('shoeLeft').style.fill = skinColor;
      this.svg.getElementById('shoeRight').style.fill = skinColor;
    }

    if (!this.minionDna.gloves) {
      this.svg.getElementById('gloveLeft').style.fill = skinColor;
      this.svg.getElementById('gloveRight').style.fill = skinColor;
    }
  }

  private setPupilTwoEyes(pupil: SVGGElement, minionDna: MinionDnaEye): void {
    // pupilLeft.setAttribute('r', minionDna.irisRadius.toString());
    // pupilLeft.setAttribute('cx', Number.parseFloat(pupilLeft.getAttribute('cx')) + minionDna.pupilShift);
    // pupilLeft.style.fill = minionDna.color;
    // pupilLeft.style.stroke = minionDna.color;
    pupil.setAttribute('transform', `${pupil.getAttribute('transform')} translate(${minionDna.pupilShift},0)`);
  }

  private setEye(pupil, eye: MinionDnaEye): void {
    pupil.setAttribute('r', eye.eyeRadius.toString());
  }

  private setCloth(cloth: number, skinColor: string): void {
    switch (cloth) {
      case 0:
        // this.svg.getElementById('underwear').remove();
        this.svg.getElementById('fancyDress').remove();
        this.svg.getElementById('workingCloth').remove();
        this.svg.getElementById('hawaii').remove();
        break;
      case 1:
        this.svg.getElementById('underwear').remove();
        // this.svg.getElementById('fancyDress').remove();
        this.svg.getElementById('workingCloth').remove();
        this.svg.getElementById('hawaii').remove();
        break;
      case 2:
        this.svg.getElementById('underwear').remove();
        this.svg.getElementById('fancyDress').remove();
        // this.svg.getElementById('workingCloth').remove();
        this.svg.getElementById('hawaii').remove();
        break;
      case 3:
        this.svg.getElementById('underwear').remove();
        this.svg.getElementById('fancyDress').remove();
        this.svg.getElementById('workingCloth').remove();
        // this.svg.getElementById('hawaii').remove();
        break;
      default:
        console.log(`cloth ${cloth} unknown.`);
    }
  }

  private setHair(hair: number): void {
    switch (hair) {
      case 0:
        this.svg.getElementById('hairSpiked').remove();
        this.svg.getElementById('hairSpikedShort').remove();
        this.svg.getElementById('hairSprout').remove();
        this.svg.getElementById('hairSleek').remove();
        break;
      case 1:
        // this.svg.getElementById('hairSpiked').remove();
        this.svg.getElementById('hairSpikedShort').remove();
        this.svg.getElementById('hairSprout').remove();
        this.svg.getElementById('hairSleek').remove();
        break;
      case 2:
        this.svg.getElementById('hairSpiked').remove();
        // this.svg.getElementById('hairSpikedShort').remove();
        this.svg.getElementById('hairSprout').remove();
        this.svg.getElementById('hairSleek').remove();
        break;
      case 3:
        this.svg.getElementById('hairSpiked').remove();
        this.svg.getElementById('hairSpikedShort').remove();
        // this.svg.getElementById('hairSprout').remove();
        this.svg.getElementById('hairSleek').remove();
        break;
      case 4:
        this.svg.getElementById('hairSpiked').remove();
        this.svg.getElementById('hairSpikedShort').remove();
        this.svg.getElementById('hairSprout').remove();
        // this.svg.getElementById('hairSleek').remove();
        break;
      default:
        console.log(`Hair ${hair} unknown.`);
    }
  }

  // chroma.hex doesn't like hex numbers that are not length 6
  private toLength6(input: string): string {
    let tmp = input;
    while (tmp.length < 6) {
      tmp = '0' + tmp;
    }
    return tmp;
  }

  private setEyes(pupilLeft, pupilRight, leftEye: MinionDnaEye, rightEye: MinionDnaEye): void {
    pupilLeft.setAttribute('r', leftEye.eyeRadius.toString());
    pupilRight.setAttribute('r', rightEye.eyeRadius.toString());
  }

  private removeFromSvg(id: string): void {
    const target = this.svg.getElementById(id);
    if (isNullOrUndefined(target)) {
      console.log(`Cannot remove id='${id}'`);
    } else {
      target.remove();
    }
  }

  private setItemInHands(hand: string, itemInHand: number) {
    switch (itemInHand) {
      case 0:
        this.removeFromSvg(`${hand}Banana`);
        this.removeFromSvg(`${hand}Wrench`);
        this.removeFromSvg(`${hand}Hammer`);
        this.removeFromSvg(`${hand}Router`);
        this.removeFromSvg(`${hand}Teddy`);
        this.removeFromSvg(`${hand}Lollie`);
        this.removeFromSvg(`${hand}Sign`);
        break;
      case 1:
        // this.svg.getElementById(`${hand}Banana`).remove();
        this.removeFromSvg(`${hand}Wrench`);
        this.removeFromSvg(`${hand}Hammer`);
        this.removeFromSvg(`${hand}Router`);
        this.removeFromSvg(`${hand}Teddy`);
        this.removeFromSvg(`${hand}Lollie`);
        this.removeFromSvg(`${hand}Sign`);
        break;
      case 2:
        this.removeFromSvg(`${hand}Banana`);
        // this.svg.getElementById(`${hand}Wrench`).remove();
        this.removeFromSvg(`${hand}Hammer`);
        this.removeFromSvg(`${hand}Router`);
        this.removeFromSvg(`${hand}Teddy`);
        this.removeFromSvg(`${hand}Lollie`);
        this.removeFromSvg(`${hand}Sign`);
        break;
      case 3:
        this.removeFromSvg(`${hand}Banana`);
        this.removeFromSvg(`${hand}Wrench`);
        // this.svg.getElementById(`${hand}Hammer`).remove();
        this.removeFromSvg(`${hand}Router`);
        this.removeFromSvg(`${hand}Teddy`);
        this.removeFromSvg(`${hand}Lollie`);
        this.removeFromSvg(`${hand}Sign`);
        break;
      case 4:
        this.removeFromSvg(`${hand}Banana`);
        this.removeFromSvg(`${hand}Wrench`);
        this.removeFromSvg(`${hand}Hammer`);
        // this.svg.getElementById(`${hand}Router`).remove();
        this.removeFromSvg(`${hand}Teddy`);
        this.removeFromSvg(`${hand}Lollie`);
        this.removeFromSvg(`${hand}Sign`);
        break;
      case 5:
        this.removeFromSvg(`${hand}Banana`);
        this.removeFromSvg(`${hand}Wrench`);
        this.removeFromSvg(`${hand}Hammer`);
        this.removeFromSvg(`${hand}Router`);
        // this.svg.getElementById(`${hand}Teddy`).remove();
        this.removeFromSvg(`${hand}Lollie`);
        this.removeFromSvg(`${hand}Sign`);
        break;
      case 6:
        this.removeFromSvg(`${hand}Banana`);
        this.removeFromSvg(`${hand}Wrench`);
        this.removeFromSvg(`${hand}Hammer`);
        this.removeFromSvg(`${hand}Router`);
        this.removeFromSvg(`${hand}Teddy`);
        // this.svg.getElementById(`${hand}Lollie`).remove();
        this.removeFromSvg(`${hand}Sign`);
        break;
      case 7:
        this.removeFromSvg(`${hand}Banana`);
        this.removeFromSvg(`${hand}Wrench`);
        this.removeFromSvg(`${hand}Hammer`);
        this.removeFromSvg(`${hand}Router`);
        this.removeFromSvg(`${hand}Teddy`);
        this.removeFromSvg(`${hand}Lollie`);
        // this.svg.getElementById(`${hand}Sign`).remove();
        break;
    }
  }
}
