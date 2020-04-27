export class Activity {

  constructor(
    public description: string,
    public id?: number,
    public isPublic?: boolean,
    public dateReg?: string,
    public trainingOn?: number,
  ) {
  }

}
