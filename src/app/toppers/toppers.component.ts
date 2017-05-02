import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FireserviceService } from './../shared/fireservice.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './../shared/data';
import * as _ from 'underscore';
import { routeFadeStateTrigger, routeSlideStateTrigger, slideInDownAnimation } from "./../shared/route-animation";

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css'],
  animations: [slideInDownAnimation]
})
export class ToppersComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';

  // usersList: FirebaseObjectObservable<any[]>;
  users: FirebaseListObservable<any[]>;
  single: any[] = [];
  multi: any[];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Score';
  showYAxisLabel = true;
  yAxisLabel = 'Users';
  data: any[] = [];
  graphData: any[] = [];
  scoreData: any[] = [];
  countsData = {};
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  constructor(public fire: AngularFire, public fireservice: FireserviceService) {




    // Object.assign(this, { single });

    console.log(this.scoreData.length);

    this.users = this.fire.database.list('users', {
      query: {
        orderByChild: 'order',
        //  orderByValue: true


      }
    });

    this.users.subscribe((items) => {
      // items is an array
      this.scoreData = [];
      items.forEach(item => {

        this.scoreData.push(item.score);

        /*    this.data.push({
              "name": item.name,
              "value": item.score
            });*/

      });


      console.log("scoreData", this.scoreData);


      // let counts = {};

      for (let i = 0; i < this.scoreData.length; i++) {
        var num = this.scoreData[i];
        this.countsData[num] = this.countsData[num] ? this.countsData[num] + 1 : 1;
      }
      console.log("countsData", this.countsData);


      for (let key in this.countsData) {
        if (this.countsData.hasOwnProperty(key)) {
          this.data.push({

            "name": key,
            "value": this.countsData[key]
          });

          // console.log(key + " -> " + this.countsData[key]);
        }
      }
      console.log("data", this.data);


      this.single = [...this.data];

      // console.log("counts data", this.countsData);

    });


  }

  ngOnInit() {


    /*  var arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
    var counts = {};
    
    for(var i = 0; i< arr.length; i++) {
        var num = arr[i];
        counts[num] = counts[num] ? counts[num]+1 : 1;
    }*/

  }

  /*  test(fireData) {
  
      fireData.forEach((x: any) => {
        this.graphData.push({ name: x.name, value: x.score });
      });
      console.log("graph Data", this.graphData);
  
    }*/

}
