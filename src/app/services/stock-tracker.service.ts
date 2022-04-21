import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

export interface MyStock{
  stockName : string
}

let  stockList : {}[] = []
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
storeData(data : any):string{
  stockList.push(data)
  localStorage.setItem("datas", JSON.stringify(stockList.slice()))
  // return stockList.slice()
  console.log("local storage in service after added",localStorage.getItem("datas"))
  return localStorage.getItem("datas")|| '[]'
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
  // console.log("in before stringify",stockList.slice())
  // localStorage.setItem("datas", JSON.stringify(stockList.slice()));
  stockList = JSON.parse(localStorage.getItem("datas") || "[]")
  console.log("local storage value load data",localStorage.getItem("datas"))
  return of(localStorage.getItem("datas"))
}
getData(){
  return JSON.parse(localStorage.getItem("datas")|| '[]')
}
removeData(sym:string){
  stockList = JSON.parse(localStorage.getItem("datas")|| '[]')
  console.log("index",stockList.findIndex((o:any) => o.sym === sym))
  stockList.splice(stockList.findIndex((o:any) => o.sym === sym),1);
  localStorage.setItem("datas",JSON.stringify(stockList))
  console.log("stocklist in service sym", stockList,sym)
  return JSON.parse(localStorage.getItem("datas")|| '[]')
}
}