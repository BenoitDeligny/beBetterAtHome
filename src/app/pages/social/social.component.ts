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


  ngOnInit(): void {

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
