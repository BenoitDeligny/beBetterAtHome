import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activityClass';
import { User } from '../models/userClass';


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

  // LOAD (aka post, put, edit) links
  createActivityURL = 'loadInfo/creerthematique'; // return new Activity
  editActivityURL = 'loadInfo/majthematique'; // edit Activity context PARAM: id ---- What about delete ?
  addTrainingOnActivity = 'loadInfo/ajoutformation'; // add trainingTime on Activity PARAM: id


  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.BASE_URL + this.userInfoURL);
  }

  getDailyTraining(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + this.dailyTrainingURL);
  }

  postTraining(newTraining: Activity): Observable<Activity> {
    console.log(newTraining);
    return this.http.post<Activity>(this.BASE_URL + this.createActivityURL, newTraining);
  }
}
