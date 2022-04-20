import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

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
  companyName: string;
  symbol: string;

  constructor(private _stockTrackerService : StockTrackerService,private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    
    console.log("activated route",this.route.snapshot.params)
    console.log("state",history.state)
    
    this.stockName = this.route.snapshot.params.symbol
    let index = history.state.id.findIndex((o:any)=>o.sym === this.stockName)
    this.companyName = history.state.id[index].desc
    this.symbol = history.state.id[index].sym
    console.log("index companyName",index,this.companyName)
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
    console.log("current date and end date",stDate,edDate)
    let numberToMonth : any= {1:"JANUARY",2:"FEBRUARY",3:"MARCH"}
    
    this._stockTrackerService.sentimentData(this.stockName,"2015-01-01","2022-03-01").subscribe((data:any)=>{
     if(data){
       for(let i = 0; i<3; i++){
      let obj = {sym : "",mspr : "",monthName : "",change : ""}
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
