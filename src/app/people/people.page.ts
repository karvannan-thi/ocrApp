import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute, private router: NavController,) {
    this.id='';
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      
      this.id = JSON.parse(params["id"]);
  });
  }
  back() {
    this.router.navigateBack(['/home']);
  }

}
