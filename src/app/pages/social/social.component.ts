import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Activity } from 'src/app/models/activityClass';
import { User } from 'src/app/models/userClass';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  currentUser: User = new User('', '', '', '', 0, 0);
  publicActivities: Activity[] = [];

  currentId = -1;
  users: any[] = [];


  constructor(private serviceOfApi: ApiServiceService) { }


  ngOnInit(): void {

    this.serviceOfApi.getUserInfo().subscribe(
      (infos) => {
        this.currentUser = infos;
      }
    );

    this.serviceOfApi.getPublicDatas().subscribe(
      (returnedPublicActivites) => {
        for (const publicActivity of returnedPublicActivites) {
          this.publicActivities.push(publicActivity);
          if (publicActivity.publicId !== this.currentId) {
            this.currentId = publicActivity.publicId;
            this.users.push(this.currentId);
          }
        }
      }


    );


  }

}
