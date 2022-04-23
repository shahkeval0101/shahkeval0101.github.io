import { BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';

export interface MyStock{
  name : string
}
export interface MyData{
  cp: string
  desc: string
  hp: string
  op: string
  pct: string
  sym: string
}
export interface SentimentData{
  sym: string;
  mspr: string;
  monthName: string;
  change: string;
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

  
   /*
    @name getStockDetails
    @description API call to get details of the stock symbol entered
    @param stockName : stockname
    @return Response of the API data
    */ 
getStockDetails(stockName : string){
    let url = "https://finnhub.io/api/v1/quote";
    const params = new HttpParams()
      .set('symbol', stockName)
      .set("token","bu4f8kn48v6uehqi3cqg")
      let headers = new HttpHeaders();
      // return of()
    return this._http.get(url, { params, headers, observe: 'response' })
}
 /*
    @name getStockName
    @description API call to get company details of the stock symbol entered
    @param stockName : stockname
    @return Response of the API data
    */
getStockName(stockName:string){
  let url = "https://finnhub.io/api/v1/search"
  const params = new HttpParams()
      .set('q', stockName)
      .set("token","bu4f8kn48v6uehqi3cqg")
      let headers = new HttpHeaders();
      return this._http.get(url, { params, headers, observe: 'response' })

}
 /*
    @name storeData
    @description To store data entered 
    @param data : object to store in the local storage
    @return Json of the values stored in local storage
    */
storeData(data : any):string{
  stockList.push(data)
  localStorage.setItem("datas", JSON.stringify(stockList.slice()))
  return JSON.parse(localStorage.getItem("datas")|| '[]')
}
  /*
    @name sentimentData
    @description API call to get company sentiments of the stock symbol entered of past months
    @param stockName : stockname
    @param startDate : from value
    @param endDate : to value
    @return Response of the API data
    */
sentimentData(stockName:any,startDate:any, endDate:any){
  let url = "https://finnhub.io/api/v1/stock/insider-sentiment"
  const params = new HttpParams()
  .set('symbol', stockName)
  .set("from",startDate)
  .set("to",endDate)
  .set("token","bu4f8kn48v6uehqi3cqg")
  let headers = new HttpHeaders();
  return this._http.get(url, { params, headers, observe: 'response' })
}
  /*
    @name loadData
    @description to load data
    @return observable of type Json to load initial data from local storage
    */
loadData(){
  stockList = JSON.parse(localStorage.getItem("datas") || "[]")
  return of(localStorage.getItem("datas"))
}
 /*
    @name getData
    @description API call to get company details of the stock symbol entered
    @param stockName : stockname
    @return Json of the values stored in local storage
    */
getData(){
  return JSON.parse(localStorage.getItem("datas")|| "[]")
}
 /*
    @name removeData
    @description To remove data from the array
    @param sym : stock symbol to be removed
    @return Json of the values stored in local storage
    */
removeData(sym:string){
  stockList = JSON.parse(localStorage.getItem("datas")|| '[]')
  stockList.splice(stockList.findIndex((o:any) => o.sym === sym),1);
  localStorage.setItem("datas",JSON.stringify(stockList))
  return JSON.parse(localStorage.getItem("datas")|| '[]')
}
}