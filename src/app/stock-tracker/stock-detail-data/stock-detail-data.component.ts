import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { StockTrackerService } from '../../services/stock-tracker.service';

@Component({
  selector: 'app-stock-detail-data',
  templateUrl: './stock-detail-data.component.html',
  styleUrls: ['./stock-detail-data.component.css']
})
export class StockDetailDataComponent implements OnInit{
 
  public greenIcon: string = '&#129145;';
  public redIcon : string = '&#129147;'
  @Input() stockName : any;
  
  initialData: string[];
  private eventsSubscription: Subscription
  stlist: any;
  constructor(private _stockTrackerService : StockTrackerService, ) { }
  @Input() events: Observable<any>;
  @Input() stockList : any

  ngOnInit()
   {
     this.stlist = this.stockList
    console.log("in child")
    this.eventsSubscription = this.events.subscribe((stockNameFromParent : any) => {
      if(stockNameFromParent){
        let stocks = {
          "sym":"",
          "desc" : "" ,
          "cp": "",
          "op": "",
          "pct" : "",
          "hp": ""
        }
        console.log("stock name", stockNameFromParent)
        this._stockTrackerService.getStockDetails(stockNameFromParent.name).subscribe((stockDetailsResponse : any)=>{
          stocks.cp = stockDetailsResponse.body.c
          stocks.op = stockDetailsResponse.body.o
          stocks.pct = stockDetailsResponse.body.dp
          stocks.hp = stockDetailsResponse.body.h
        })
        this._stockTrackerService.getStockName(stockNameFromParent.name).subscribe((stockNameResponse : any)=>{
          stocks.sym = stockNameResponse.body.result[0].symbol
          stocks.desc = stockNameResponse.body.result[0].description
          
          // this.stockList.push(stocks)
          this.stlist = this._stockTrackerService.storeData(stocks)
          console.log("stock list",this.stlist)          
        })
      }
     
  });  
  
}
onClose(event : Event, sym:string){
  console.log("event",event,sym)
  this.stlist = this._stockTrackerService.removeData(sym)
  console.log("this.stocklist in detail component",this.stlist)
}
ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
