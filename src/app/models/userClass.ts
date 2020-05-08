export class User {
  constructor(
    public email: string,
    public name: string,
    public surname: string,
    public dateReg: string,
    public publicId: number,
    public dailyTraining: number)  {
    }
}
