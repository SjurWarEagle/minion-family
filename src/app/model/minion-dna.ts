export class MinionDnaEye {
  color: string;
  pupilShift: number;
  irisRadius: number;
  eyeRadius: number;
}

export class MinionDna {
  public name: string = 'TODO';
  public eyeLeft: MinionDnaEye;
  public eyeRight: MinionDnaEye;
  public pocket: boolean;
  public gloves: boolean;
  public shoes: boolean;
  /**
   * The way the mouth is formed
   */
  public mood: number;
}
