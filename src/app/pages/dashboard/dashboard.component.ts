import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activityClass';
import { User } from 'src/app/models/userClass';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { TimeAdded } from 'src/app/models/time-added';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  constructor(private serviceOfApi: ApiServiceService) { }

  // RELOAD CHART AFTER NGONINIT


  // Variable de récupération des valeurs
  myUser: User = new User('', '', '', '', 0);
  myDailyTraining = 0;
  activities: Activity[] = [];
  currentActivity: Activity = new Activity('', 0);
  nameAdded = '';
  addedTime = 0;

  buttonDisplay = true;


  ngOnInit(): void {

    // Récupération des infos Utilisateur
    this.serviceOfApi.getUserInfo().subscribe(
      (userInfos) => {
        this.myUser = userInfos;
      }
    );

    // Récupération des activités de l'utilisateur
    this.serviceOfApi.getActivities().subscribe(
      (activities) => {
        this.activities = activities;
        for (const activity of this.activities) {
          this.serviceOfApi.getActivityTimeTraining(activity.id).subscribe(
            (time) => {
              activity.trainingOn = time.resultat;
            }
          );
        }
      }
    );

    // Récupération du temps d'entrainement total sur la journée
    this.serviceOfApi.getDailyTraining().subscribe(
      (dailyTraining) => {
        this.myDailyTraining = dailyTraining.resultat;
      }
    );
  }


  // Ajouter du temps d'entrainement sur une activité
  addTrainingTime(addedTime: number, id: number) {
    let timeAdded = new TimeAdded(addedTime, id);
    this.serviceOfApi.postAddTrainingTime(timeAdded).subscribe(
      (time) => {
        timeAdded = time;
        this.ngOnInit();
      }
    );
  }

  // ajouter une activité
  addActivity() {
    if (this.nameAdded !== '') {
      this.currentActivity.description = this.nameAdded;

      this.serviceOfApi.postTraining(this.currentActivity).subscribe(() => {
        this.ngOnInit();
      });
      this.nameAdded = '';
    }
  }

  // Changer le nom d'une activité
  editNameActivity(activity: Activity) {
    this.nameAdded = activity.description;
    this.currentActivity = activity;
    console.log(this.currentActivity);
    this.buttonDisplay = false;
  }
  sendNewName(newName: string) {
    this.currentActivity.description = newName;
    this.serviceOfApi.editActivity(this.currentActivity).subscribe(
      () => {
        this.buttonDisplay = true;
        this.ngOnInit();
      }
    );
  }

  // Rendre une activité publique ou non
  isPublic(activity: Activity) {
    if (activity.isPublic === 0) {
      activity.isPublic = 1;
    } else {
      activity.isPublic = 0;
    }
    this.serviceOfApi.editActivity(activity).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }

  // supprimer toutes les activités
  destroyThemAll() {
    this.serviceOfApi.destroy().subscribe();
    this.ngOnInit();
  }
}
