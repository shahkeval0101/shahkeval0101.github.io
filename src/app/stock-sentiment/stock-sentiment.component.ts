import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { StockTrackerComponent } from '../stock-tracker/stock-tracker.component';
import { StockTrackerService } from '../services/stock-tracker.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css']
})
export class StockSentimentComponent implements OnInit {
  stockName: any;
  sentimentList:any = []
  public greenIcon: string = '&#129145;';
  public redIcon : string = '&#129147;'
  constructor(private _stockTrackerService : StockTrackerService,private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    console.log("activated route",this.route.snapshot.params.symbol)
    this.stockName = this.route.snapshot.params.symbol
    // let currentDate = new Date();
    // const startDate = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    // let endDate = currentDate.getMonth()-2


  let startDate = new Date()
  let endDate = new Date(startDate);

  console.log('Original date: ', startDate.toString());

  endDate.setMonth(endDate.getMonth() - 2);

  console.log('After subtracting a month: ', endDate.toString());
  let stDate = formatDate(startDate, 'yyyy-MM-dd', 'en-US');
  let edDate = formatDate(endDate, 'yyyy-MM-dd', 'en-US');

    console.log("current date",stDate,edDate)
    let numberToMonth : any= {1:"JANUARY",2:"FEBRUARY",3:"MARCH"}
    this._stockTrackerService.sentimentData(this.stockName,"2015-01-01","2022-03-01").subscribe((data:any)=>{
      console.log(data)
     if(data){
       for(let i = 0; i<3; i++){
      let obj = {sym : "",mspr : "",monthName : "",change : ""}
       console.log(data.body.data[i].month)
       obj.sym =  data.body.data[i].symbol
       obj.mspr =  data.body.data[i].mspr
       obj.monthName =  numberToMonth[data.body.data[i].month]
       obj.change =  data.body.data[i].change
       console.log("obj",obj)
       this.sentimentList.push(obj)
       console.log("sentiment list",this.sentimentList)
     }  
    }

    })
    
  }

}
