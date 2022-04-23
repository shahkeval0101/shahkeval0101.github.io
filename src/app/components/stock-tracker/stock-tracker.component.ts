import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { StockTrackerService } from '../../services/stock-tracker.service';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css'],
})
export class StockTrackerComponent implements OnInit {
  public stockAdder: FormGroup;
  stockdetaildataflag: boolean;
  public stockName: any = {
    name: '',
  };
  eventsSubject = new BehaviorSubject<any>('');
  public stockList: any = [];
  formValidation: boolean = false;
  loading: boolean = false;

  constructor(
    private _stockTrackerService: StockTrackerService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initialLoadData();
    this.initiateForm();
    this.listenToValueChange();
  }

  /*
    @name initialLoadData
    @description Whenever application is loaded in browser to display initial values from browser local storage uptil 20
    @return void
    */
  initialLoadData() {
    if (JSON.parse(localStorage.getItem('datas') || '[]').length > 20) {
      //clear data when local storage has values more than 20 when reloaded
      localStorage.clear();
    }
    this._stockTrackerService.loadData().subscribe((data: any) => {
      console.log('Load Data on Init', JSON.parse(data));
      this.stockList = JSON.parse(data);
    });
  }
  /*
    @name initiateForm
    @description Displays Form
    @return void
    */
  initiateForm() {
    this.stockAdder = new FormGroup({
      stockSymbol: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
    });
  }

  /*
    @name onTrackStockClick
    @description On click of Track Status, Adds values to the child component
    @return void
    */
  onTrackStockClick() {
    this.loading = true;
    console.log(
      'Input Value',
      this.stockAdder.get('stockSymbol')?.value.toUpperCase()
    );
    this.changeDetector.detectChanges();
    this.stockName.name = this.stockAdder
      .get('stockSymbol')
      ?.value.toUpperCase();
    this.eventsSubject.next(this.stockName);
    this.stockdetaildataflag = true;
  }

  /*
    @name addItem
    @description return value from child component using event binding, for form validation on input field
    @param value: Boolean value return to know to show error message
    @return void
    */
  addItem(value: boolean) {
    this.formValidation = value;
    this.changeDetector.detectChanges();
    if (this.formValidation) {
      this.stockAdder.controls.stockSymbol.setErrors({
        RequiredValue: this.formValidation,
      });
    }else{
      this.stockAdder.reset()
    }

    this.loading = false;
  }
  /*
    @name listenToValueChange
    @description listen to value changes happening in input field and display validation message accordingly
    @return void
    */
  listenToValueChange() {
    this.stockAdder.controls.stockSymbol.valueChanges.subscribe((value) => {
    
      let currentStockList = this._stockTrackerService.getData();
      console.log("value changes, current stock list",value,currentStockList)
      if (value == '') {
        this.stockAdder.controls.stockSymbol.setErrors({ RequiredValue: true });
      }
      if (value && value.length>5 ) {
        this.stockAdder.controls.stockSymbol.setErrors({ RequiredValue: true });
      }
      
      if (value && currentStockList.findIndex((o: any) => o.sym == value.toUpperCase()) != -1) {
        this.stockAdder.controls.stockSymbol.setErrors({ invalidValue: true });
      }
      
    });
  }
}
