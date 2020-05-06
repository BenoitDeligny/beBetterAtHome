export class Activity {

  constructor(
    public description: string,
    public isPublic: number,
    public dateReg?: string,
    public trainingOn?: number,
    public addedTime?: number,
    public id?: number,
    public publicId?: number,
    public amountTraining?: number
  ) {
  }

}
