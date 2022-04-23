import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { MyData, MyStock, StockTrackerService } from '../../../services/stock-tracker.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-stock-detail-data',
  templateUrl: './stock-detail-data.component.html',
  styleUrls: ['./stock-detail-data.component.css'],
})
export class StockDetailDataComponent implements OnInit {
  @Input() stockName: MyStock;
  private eventsSubscription: Subscription;
  stlist:any = [];
  companyName: string;
  constructor(private _stockTrackerService: StockTrackerService) {}
  @Input() events: Observable<MyStock>;
  @Input() stockList: MyData[];
  @Output() notifyEvent = new EventEmitter<boolean>();
  ngOnInit() {
    this.stlist = this.stockList;
    console.log('In Child Component');
    this.initiateApi();
  }
  /*
    @name initiateApi
    @description Child component to display value once value is added
    @return void
    */
  initiateApi() {
    this.eventsSubscription = this.events.subscribe(
      (stockNameFromParent: any) => {
        // subscribing to listen events from parent component
        if (stockNameFromParent) {
          let stocks = {
            sym: '',
            desc: '',
            cp: '',
            op: '',
            pct: '',
            hp: '',
          };
          this._stockTrackerService
            .getStockDetails(stockNameFromParent.name)
            .subscribe((stockDetailsResponse: any) => {
              //API call to get stock details
              if (
                stockDetailsResponse.body.o > 0 &&
                stockDetailsResponse.body.h > 0 &&
                stockDetailsResponse.body.c > 0
              ) {
                stocks.cp = stockDetailsResponse.body.c;
                stocks.op = stockDetailsResponse.body.o;
                stocks.pct = stockDetailsResponse.body.dp;
                stocks.hp = stockDetailsResponse.body.h;

                this._stockTrackerService
                  .getStockName(stockNameFromParent.name)
                  .subscribe((stockNameResponse: any) => {
                    //API call to get Company name
                    stocks.sym = stockNameResponse.body.result[0].symbol;
                    stocks.desc = stockNameResponse.body.result[0].description;
                    this.stlist  = this._stockTrackerService.storeData(stocks);
                    console.log('Stock List after Data added', this.stlist);
                    this.notifyEvent.emit(false);
                  });
              } else {
                this.notifyEvent.emit(true); //if wrong i/p is added to show validation in parent component i/p field
              }
            });
        }
      }
    );
  }
  onClose(event: Event, sym: string) {
    this.stlist = this._stockTrackerService.removeData(sym);
    console.log(
      'Stock List after data is deleted in detail component',
      this.stlist
    );
  }
  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
