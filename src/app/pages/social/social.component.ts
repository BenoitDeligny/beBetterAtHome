import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Activity } from 'src/app/models/activityClass';
import { User } from 'src/app/models/userClass';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  userInfos: User = new User('', '', '', '', 0);
  activities: Activity[] = [];
  publicActivities: Activity[] = [];

  constructor(private serviceOfApi: ApiServiceService) { }


  ngOnInit(): void {

    this.serviceOfApi.getUserInfo().subscribe(
      (infos) => {
        this.userInfos = infos;
      }
    );

    this.serviceOfApi.getPublicDatas().subscribe(
      (returnedPublicActivites) => {
        for (const publicActivity of returnedPublicActivites) {
          this.publicActivities.push(publicActivity);
        }
      }
    );


  }

}
