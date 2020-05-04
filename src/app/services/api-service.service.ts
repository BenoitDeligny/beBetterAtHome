import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activityClass';
import { User } from '../models/userClass';
import { TimeAdded } from '../models/time-added';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  BASE_URL = 'https://www.dataxchange.fr/BHome/api/';

  // GET links
  dailyTrainingURL = 'getInfo/formationquotidienne'; // return {"resultat" : number} PARAM: user ?
  totalTimeOnActivityURL = 'getInfo/totalformationthematique'; // return {"resultat" : number} PARAM: idThematique
  userActivityURL = 'getInfo/thematiquesutilisateur'; // return {'id' : 1, 'description' : 'blabla', 'isPublic' : 0/1, 'dateReg' : '2020-01-13 00:00:00'} PARAM: user ?
  userInfoURL = 'getInfo/infosUtilisateur'; // return {'email' : 'ford.prefect@betelgueuse.star', 'name' : 'Ford', 'surname' : 'Prefect', 'dateReg' : '2020-01-13 00:00:00'} PARAM: user ?
  userTotalTimeLearningURL = 'getInfo/totalFormationUtilisateur'; // return {"resultat" : number} PARAM: user ?
  publicDatasURL = 'getInfo/activitespubliques';

  // LOAD (aka post, put, edit) links
  createActivityURL = 'loadInfo/creerthematique'; // return new Activity
  editActivityURL = 'loadInfo/majthematique'; // edit Activity context PARAM: id ---- What about delete ?
  addTrainingOnActivityURL = 'loadInfo/ajoutformation'; // add trainingTime on Activity PARAM: id
  destroyURL = 'loadInfo/activitiesdestroythemall';

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.BASE_URL + this.userInfoURL);
  }

  getPublicDatas(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.BASE_URL + this.publicDatasURL);
  }

  getDailyTraining(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + this.dailyTrainingURL);
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.BASE_URL + this.userActivityURL);
  }

  getActivityTimeTraining(id: number): Observable<any> {
    return this.http.get<any>(this.BASE_URL + this.totalTimeOnActivityURL + `?idthematique=${id}`);
  }

  postTraining(newTraining: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.BASE_URL + this.createActivityURL, newTraining);
  }

  postAddTrainingTime(timeAdded: TimeAdded): Observable<TimeAdded> {
    return this.http.post<TimeAdded>(this.BASE_URL + this.addTrainingOnActivityURL, timeAdded);
  }

  editActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.BASE_URL + this.editActivityURL, activity);
  }

  destroy() {
    return this.http.post(this.BASE_URL + this.destroyURL, {});
  }
}
