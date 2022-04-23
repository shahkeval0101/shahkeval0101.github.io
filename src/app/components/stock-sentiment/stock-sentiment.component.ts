import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { StockTrackerService } from '../../services/stock-tracker.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css'],
})
export class StockSentimentComponent implements OnInit {
  stockName: any;
  sentimentList: any = [];
  public greenIcon: string = '&#129145;';
  public redIcon: string = '&#129147;';
  companyName: string;
  symbol: string;

  constructor(
    private _stockTrackerService: StockTrackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initiateApi();
  }
  /*
    @name initiateApi
    @description To display sentiments from past months
    @return void
    */
  initiateApi() {
    this.stockName = this.route.snapshot.params.symbol; //get value from url
    let index = history.state.id.findIndex(
      (o: any) => o.sym === this.stockName
    ); // get value of the data passed
    this.companyName = history.state.id[index].desc;
    this.symbol = history.state.id[index].sym;

    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    let endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() - 2);
    let stDate = formatDate(startDate, 'yyyy-MM-dd', 'en-US');
    let edDate = formatDate(endDate, 'yyyy-MM-dd', 'en-US');
    console.log('current date and end date', stDate, edDate); //formatting start Date and end Date
    let numberToMonth: any = {
      1: 'JANUARY',
      2: 'FEBRUARY',
      3: 'MARCH',
      4: 'APRIL',
      5: 'MAY',
      6: 'JUNE',
      7: 'JULY',
      8: 'AUGUST',
      9: 'SEPTEMBER',
      10: 'OCTOBER',
      11: 'NOVEMBER',
      12: 'DECEMBER',
    };

    this._stockTrackerService
      .sentimentData(this.stockName, edDate, stDate)
      .subscribe((data: any) => {
        if (data) {
          for (let i = 0; i < data.body.data.length; i++) {
            let obj = { sym: '', mspr: '', monthName: '', change: '' };
            obj.sym = data.body.data[i].symbol;
            obj.mspr = data.body.data[i].mspr;
            obj.monthName = numberToMonth[data.body.data[i].month];
            obj.change = data.body.data[i].change;
            this.sentimentList.push(obj);
          }
        }
      });
  }
}
