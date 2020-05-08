import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Activity } from 'src/app/models/activityClass';
import { User } from 'src/app/models/userClass';

@Component({
  selector: 'app-public-chart',
  templateUrl: './public-chart.component.html',
  styleUrls: ['./public-chart.component.scss']
})
export class PublicChartComponent implements OnInit {

  @Input() user = 0;

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

    this.serviceOfApi.getPublicDatas().subscribe(
      (returnedActivities) => {
        for (const activity of returnedActivities) {
          if (activity.publicId === this.user) {
            this.pieChartLabels.push(activity.description);
            this.pieChartData.push(activity.amountTraining);
          }
        }
        this.activities = returnedActivities;
      }
    );
  }
}
