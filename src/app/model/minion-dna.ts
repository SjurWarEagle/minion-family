export class MinionDnaEye {
  color: string;
  pupilShift: number;
  irisRadius: number;
  eyeRadius: number;
}

export class MinionDna {
  public name: string = 'TODO';
  public twoEyes: boolean;
  public eyeLeft: MinionDnaEye;
  public eyeRight: MinionDnaEye;
  public eye: MinionDnaEye;
  public onlyUnderwear: boolean;
  public pocket: boolean;
  public gloves: boolean;
  public shoes: boolean;
  public skinColor: number;
  public hairType: number;
  public holdsItem: boolean;
  public itemInHand: number;
  /**
   * The way the mouth is formed
   */
  public mood: number;
}
