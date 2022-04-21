import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

export interface MyStock{
  stockName : string
}

let  stockList : {}[] = [
  {
      "sym": "AAPL",
      "desc": "APPLE INC",
      "cp": 165.76,
      "op": 165.02,
      "pct": 0.418,
      "hp": 165.95
  },
  {
      "sym": "MSFT",
      "desc": "MICROSOFT CORP",
      "cp": 283.42,
      "op": 279.38,
      "pct": 1.0338,
      "hp": 283.4542
  },
  {
      "sym": "GOOG",
      "desc": "ALPHABET INC-CL C",
      "cp": 2587,
      "op": 2561.54,
      "pct": 1.0855,
      "hp": 2593.925
  },
  {
      "sym": "AMZN",
      "desc": "AMAZON.COM INC",
      "cp": 3084.21,
      "op": 3040.59,
      "pct": 0.933,
      "hp": 3088.76
  },
  {
      "sym": "FB",
      "desc": "META PLATFORMS INC-CLASS A",
      "cp": 212.6505,
      "op": 210.52,
      "pct": 0.8922,
      "hp": 212.93
  }
]
@Injectable({
  providedIn: 'root'
})
export class StockTrackerService {
public stocks: Array<string> = ['GOOG', 'FB', 'AMZN', 'TWTR'];
 public bsubject = new BehaviorSubject<any>("")
  stockStoredData: any = [];

  constructor(private _http : HttpClient) { }

  
  
getStockDetails(stockName : string){
    let url = "https://finnhub.io/api/v1/quote";
    const params = new HttpParams()
      .set('symbol', stockName)
      .set("token","bu4f8kn48v6uehqi3cqg")
      let headers = new HttpHeaders();
      // return of()
    return this._http.get(url, { params, headers, observe: 'response' })
}
getStockName(stockName:string){
  let url = "https://finnhub.io/api/v1/search"
  const params = new HttpParams()
      .set('q', stockName)
      .set("token","bu4f8kn48v6uehqi3cqg")
      let headers = new HttpHeaders();
      return this._http.get(url, { params, headers, observe: 'response' })

}
storeData(data : any){
  stockList.push(data)
  return stockList.slice()
  // this.bsubject.next(this.stockStoredData)
}
sentimentData(stockName:any,startDate:any, endDate:any){
  let url = "https://finnhub.io/api/v1/stock/insider-sentiment"
  const params = new HttpParams()
  .set('symbol', stockName)
  .set("from",startDate)
  .set("to",endDate)
  .set("token","bu4f8kn48v6uehqi3cqg")
  let headers = new HttpHeaders();
  console.log("params  symbol ",params,stockName)
  return this._http.get(url, { params, headers, observe: 'response' })
}

loadData(){
  return of(stockList.slice())
}
getData(){
  return stockList.slice()
}
removeData(sym:string){
  console.log("index",stockList.findIndex((o:any) => o.sym === sym))
  stockList.splice(stockList.findIndex((o:any) => o.sym === sym),1);
  console.log("stocklist in service sym", stockList,sym)
  return stockList.slice()
}
}