import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activityClass';
import { User } from 'src/app/models/userClass';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { TimeAdded } from 'src/app/models/time-added';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  constructor(private serviceOfApi: ApiServiceService) { }


  // CHART CODE BEGIN
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.5)',
        'rgba(0,255,0,0.5)',
        'rgba(0,0,255,0.5)',
        'rgba(120,0,120,0.5)',
        'rgba(0,120,120,0.5)',
        'rgba(120,120,0,0.5)',
        'rgba(120,180,0,0.5)',
        'rgba(0,120,180,0.5)',
        'rgba(180,0,120,0.5)',
        'rgba(180,180,180,0.5)',
      ]
    },
  ];
  // CHART CODE END


  myUser: User = new User('', '', '', '', 0);
  myDailyTraining = 0;
  activities: Activity[] = [];
  newActivity: Activity;
  nameAdded = '';
  addedTime = 0;

  buttonDisplay = true;


  ngOnInit(): void {

    this.serviceOfApi.getUserInfo().subscribe(
      (userInfos) => {
        this.myUser = userInfos;
      }
    );

    this.serviceOfApi.getDailyTraining().subscribe(
      (dailyTraining) => {
        this.myDailyTraining = dailyTraining.resultat;
      }
    );

    this.serviceOfApi.getActivities().subscribe(
      (returnedActivities) => {
        for (const activity of returnedActivities) {
          this.serviceOfApi.getActivityTimeTraining(activity.id).subscribe(
            (time) => {
              activity.trainingOn = time.resultat;
              this.pieChartLabels.push(activity.description);
              this.pieChartData.push(activity.trainingOn);
            }
          );
        }
        this.activities = returnedActivities;
      }
    );
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  addTrainingTime(addedTime: number, id: number) {
    let timeAdded = new TimeAdded(addedTime, id);
    this.serviceOfApi.postAddTrainingTime(timeAdded).subscribe(
      (time) => {
        timeAdded = time;
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.ngOnInit();
      }
    );
  }

  addActivity() {
    if (this.nameAdded !== '') {
      this.newActivity = new Activity(this.nameAdded);

      this.serviceOfApi.postTraining(this.newActivity).subscribe(() => {
        this.ngOnInit();
      });
      this.nameAdded = '';
    }
  }

  editNameActivity(activity: Activity) {
    this.nameAdded = activity.description;
    this.buttonDisplay = false;
  }

  sendNewName(activity: Activity) {

    this.serviceOfApi.editActivity(activity).subscribe(
      (modifiedName) => {
        activity.description = modifiedName.description;
      }
    );
  }

  isPublic(activity: Activity) {
    this.serviceOfApi.editActivity(activity).subscribe(
      () => {
        console.log(activity.isPublic);
        activity.isPublic = !activity.isPublic;
        console.log(activity.isPublic);
      }
    );
  }

  destroyThemAll() {
    this.serviceOfApi.destroy().subscribe();
    this.ngOnInit();
  }
}
