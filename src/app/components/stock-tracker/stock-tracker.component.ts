import { BehaviorSubject, Subject } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { StockTrackerService } from '../../services/stock-tracker.service';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css']
})
export class StockTrackerComponent implements OnInit {
  public StockAdder : FormGroup;
  stockdetaildataflag: boolean;
  public stockName: any = {
    name : ""
  };
  eventsSubject = new BehaviorSubject<any>("");
  public stockList: any = [];
  formValidation : boolean = false
  loading: boolean = false;
   
  constructor(private _stockTrackerService : StockTrackerService,private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._stockTrackerService.loadData().subscribe((data : any)=>{
      console.log("load data",JSON.parse(data))
      this.stockList = JSON.parse(data)
    })
    this.initiateForm()
    this.listenToValueChange()
  }
  initiateForm(){
    this.StockAdder = new FormGroup({
      StockSymbol : new FormControl(null, [
        Validators.required, Validators.minLength(1), Validators.maxLength(5),
      ])
    })
  }
  onTrackStockClick(){
    this.loading = true;
    console.log("input value", this.StockAdder.get("StockSymbol")?.value.toUpperCase())
    this.changeDetector.detectChanges();
    this.stockName.name =  this.StockAdder.get("StockSymbol")?.value.toUpperCase()
    this.eventsSubject.next(this.stockName);
    this.stockdetaildataflag= true
  }
addItem(value : boolean){
  this.formValidation = value
  this.changeDetector.detectChanges();
  console.log(this.formValidation)
  if(this.formValidation){
    this.StockAdder.controls.StockSymbol.setErrors({RequiredValue:this.formValidation})
  }

  this.loading = false;

}

listenToValueChange(){
  
  this.StockAdder.controls.StockSymbol.valueChanges.subscribe(value=>{
    let currentStockList = this._stockTrackerService.getData()
    console.log("val",currentStockList.findIndex((o:any)=> o.sym == value ))
    if(value == ""){
      this.StockAdder.controls.StockSymbol.setErrors({RequiredValue:true})
    }
    if(currentStockList.findIndex((o:any)=> o.sym == value ) != -1){
      this.StockAdder.controls.StockSymbol.setErrors({invalidValue:true})
    }
  })
}
}
