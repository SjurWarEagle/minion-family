import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DnaRandomizerService } from '../../services/dna-randomizer.service';
import { MinionDna, MinionDnaEye } from '../../model/minion-dna';
import { v1 } from 'uuid';
import * as chroma from 'chroma-js';

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

    // const svgSize = Math.min(tmp.getBoundingClientRect().height, tmp.getBoundingClientRect().width) + 'px';
    // console.log('svgSize', svgSize);
    // this.svg.setAttribute('height', svgSize);
    // this.svg.setAttribute('width', svgSize);
    //
    // minion original color: fce029
    const colorScale = chroma.scale(['fce029', 'fcc629']).domain([0, 100]);
    const skinColor = colorScale(this.minionDna.skinColor).hex();

    this.updateIds(this.svg);
    this.setGradientForIris(this.svg.getElementById(this.ids.eyeRadiant), this.minionDna.eye.color);

    if (this.minionDna.twoEyes) {
      this.setEyes(
        this.svg.getElementById('eyeRight'),
        this.svg.getElementById('eyeLeft'),
        this.minionDna.eyeRight,
        this.minionDna.eyeLeft
      );
      this.setPupilTwoEyes(this.svg.getElementById('doubleEyesPupilLeft'), this.minionDna.eyeLeft);
      this.setPupilTwoEyes(this.svg.getElementById('doubleEyesPupilRight'), this.minionDna.eyeRight);

      this.svg.getElementById('groupSingleEye').remove(0);
    } else {
      this.setEye(this.svg.getElementById('eye'), this.minionDna.eyeRight);
      this.setPupilSingleEye(this.svg.getElementById('singleEyePupil'), this.minionDna.eye);
      this.svg.getElementById('groupDoubleEyes').remove();
    }

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

  private setPupilSingleEye(pupil, minionDna: MinionDnaEye): void {
    // pupil.setAttribute('r', minionDna.irisRadius.toString());
    // pupil.style.fill = minionDna.color;
    // pupil.style.stroke = minionDna.color;
    // console.log('pupil', pupil);
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
        break;
      case 1:
        this.svg.getElementById('underwear').remove();
        // this.svg.getElementById('fancyDress').remove();
        this.svg.getElementById('workingCloth').remove();
        break;
      case 2:
        this.svg.getElementById('underwear').remove();
        this.svg.getElementById('fancyDress').remove();
        // this.svg.getElementById('workingCloth').remove();
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

  private setGradientForIris(gradient: SVGRadialGradientElement, color: string): void {
    // console.log('gradient',gradient.children[2]);

    (gradient.children[1] as any).style = 'stop-color:' + color;
    (gradient.children[2] as any).style = 'stop-color:' + color;
  }

  private setEyes(pupilLeft, pupilRight, leftEye: MinionDnaEye, rightEye: MinionDnaEye): void {
    pupilLeft.setAttribute('r', leftEye.eyeRadius.toString());
    pupilRight.setAttribute('r', rightEye.eyeRadius.toString());
  }

  private updateIds(svg: HTMLElement | any) {
    const id = v1();
    this.ids.eyeRadiant = 'singleEyeIris' + id;
    svg.getElementById('radialGradient29600').setAttribute('id', this.ids.eyeRadiant);
    // console.log(svg.getElementById(this.ids.eyeRadiant));
    svg.getElementById(
      'singleEyePupilPart1'
    ).style = `fill:url(#${this.ids.eyeRadiant});fill-rule:evenodd;stroke-width:0.04412191`;
    svg.getElementById(
      'doubleEyesPupilLeftPart1'
    ).style = `fill:url(#${this.ids.eyeRadiant});fill-rule:evenodd;stroke-width:0.04412191`;
    svg.getElementById(
      'doubleEyesPupilRightPart1'
    ).style = `fill:url(#${this.ids.eyeRadiant});fill-rule:evenodd;stroke-width:0.04412191`;
    // console.log(svg.getElementById('singleEyePupilPart1'));
  }

  private setItemInHands(hand: string, itemInHand: number) {
    switch (itemInHand) {
      case 0:
        this.svg.getElementById(`${hand}Banana`).remove();
        this.svg.getElementById(`${hand}Wrench`).remove();
        this.svg.getElementById(`${hand}Hammer`).remove();
        this.svg.getElementById(`${hand}Router`).remove();
        this.svg.getElementById(`${hand}Teddy`).remove();
        this.svg.getElementById(`${hand}Lollie`).remove();
        break;
      case 1:
        // this.svg.getElementById(`${hand}Banana`).remove();
        this.svg.getElementById(`${hand}Wrench`).remove();
        this.svg.getElementById(`${hand}Hammer`).remove();
        this.svg.getElementById(`${hand}Router`).remove();
        this.svg.getElementById(`${hand}Teddy`).remove();
        this.svg.getElementById(`${hand}Lollie`).remove();
        break;
      case 2:
        this.svg.getElementById(`${hand}Banana`).remove();
        // this.svg.getElementById(`${hand}Wrench`).remove();
        this.svg.getElementById(`${hand}Hammer`).remove();
        this.svg.getElementById(`${hand}Router`).remove();
        this.svg.getElementById(`${hand}Teddy`).remove();
        this.svg.getElementById(`${hand}Lollie`).remove();
        break;
      case 3:
        this.svg.getElementById(`${hand}Banana`).remove();
        this.svg.getElementById(`${hand}Wrench`).remove();
        // this.svg.getElementById(`${hand}Hammer`).remove();
        this.svg.getElementById(`${hand}Router`).remove();
        this.svg.getElementById(`${hand}Teddy`).remove();
        this.svg.getElementById(`${hand}Lollie`).remove();
        break;
      case 4:
        this.svg.getElementById(`${hand}Banana`).remove();
        this.svg.getElementById(`${hand}Wrench`).remove();
        this.svg.getElementById(`${hand}Hammer`).remove();
        // this.svg.getElementById(`${hand}Router`).remove();
        this.svg.getElementById(`${hand}Teddy`).remove();
        this.svg.getElementById(`${hand}Lollie`).remove();
        break;
      case 5:
        this.svg.getElementById(`${hand}Banana`).remove();
        this.svg.getElementById(`${hand}Wrench`).remove();
        this.svg.getElementById(`${hand}Hammer`).remove();
        this.svg.getElementById(`${hand}Router`).remove();
        // this.svg.getElementById(`${hand}Teddy`).remove();
        this.svg.getElementById(`${hand}Lollie`).remove();
        break;
      case 6:
        this.svg.getElementById(`${hand}Banana`).remove();
        this.svg.getElementById(`${hand}Wrench`).remove();
        this.svg.getElementById(`${hand}Hammer`).remove();
        this.svg.getElementById(`${hand}Router`).remove();
        this.svg.getElementById(`${hand}Teddy`).remove();
        // this.svg.getElementById(`${hand}Lollie`).remove();
        break;
    }
  }
}
