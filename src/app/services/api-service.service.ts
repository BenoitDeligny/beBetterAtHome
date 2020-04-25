import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../models/activityClass';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  critere: 'verify';

  BASE_URL = 'https://www.dataxchange.fr/BHome/api/getInfo/verify';
  tempToken = 'dataToken4ffc05cc32d7a188065410f691fadd01';

  constructor(private http: HttpClient) { }

  getDailyTraining(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }
}
