import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activityClass';
import { User } from 'src/app/models/userClass';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  myUser = new User(1, 'Benoit', 'email@email.com', 'pouet');

  activities: Activity[] = [];
  currentId = 0;
  nameAdded = '';

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
      backgroundColor: ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)', 'rgba(120,120,120,0.5', 'rgba(180,180,180,0.5']
    },
  ];

  testString = '';

  constructor(private serviceOfApi: ApiServiceService) { }

  ngOnInit(): void {
    this.serviceOfApi.getDailyTraining().subscribe(
      (data) => {
        this.testString = data.status;
      }
    );
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  addTrainingTime(element) {
    element.trainingOn += element.timeAdding;
    this.pieChartData = this.activities.map((a) => a.trainingOn);
    element.timeAdding = 0;
  }

  addActivity() {
    if (this.nameAdded !== '') {
      this.activities.push(new Activity(this.currentId++, this.nameAdded, 0, 0));
      this.pieChartLabels.push(this.nameAdded);

      this.nameAdded = '';
    }
  }
}
