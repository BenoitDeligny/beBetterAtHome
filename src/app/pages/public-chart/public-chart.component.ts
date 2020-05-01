import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Activity } from 'src/app/models/activityClass';

@Component({
  selector: 'app-public-chart',
  templateUrl: './public-chart.component.html',
  styleUrls: ['./public-chart.component.scss']
})
export class PublicChartComponent implements OnInit {

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
        'rgba(255,0,0,1)',
        'rgba(0,255,0,1)',
        'rgba(0,0,255,1)',
        'rgba(180,0,0,1)',
        'rgba(0,180,0,1)',
        'rgba(0,0,180,1)',
        'rgba(255,255,0,1)',
        'rgba(255,0,255,1)',
        'rgba(0,255,255,1)',
        'rgba(180,180,0,1)',
        'rgba(0,180,180,1)',
        'rgba(180,0,180,1)',
        'rgba(120,0,0,1)',
        'rgba(0,120,0,1)',
        'rgba(0,0,120,1)',
        'rgba(120,120,0,1)',
        'rgba(120,0,120,1)',
        'rgba(0,120,120,1)'
      ],
    },
  ];

  activities: Activity[] = [];

  constructor(private serviceOfApi: ApiServiceService) { }

  ngOnInit(): void {
    this.serviceOfApi.getActivities().subscribe(
      (returnedActivities) => {
        for (const activity of returnedActivities) {
          if (activity.isPublic === 1) {
            this.serviceOfApi.getActivityTimeTraining(activity.id).subscribe(
              (time) => {
                activity.trainingOn = time.resultat;
                this.pieChartLabels.push(activity.description);
                this.pieChartData.push(activity.trainingOn);
              }
            );
          }
        }
        this.activities = returnedActivities;
      }
    );
  }
}
