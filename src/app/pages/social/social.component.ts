import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Activity } from 'src/app/models/activityClass';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  activities: Activity[] = [];
  publicActivities: Activity[] = [];

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

  ngOnInit(): void {
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

    this.serviceOfApi.getPublicDatas().subscribe(
      (returnedPublicActivites) => {
        for (const publicActivity of returnedPublicActivites) {
          this.publicActivities.push(publicActivity);
        }
      }
    );
    console.log(this.publicActivities);
  }

}
