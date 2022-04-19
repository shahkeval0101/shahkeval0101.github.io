import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockDetailDataComponent } from './stock-tracker/stock-detail-data/stock-detail-data.component';
import { StockSentimentComponent } from './stock-sentiment/stock-sentiment.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { StockTrackerService } from './services/stock-tracker.service';

@NgModule({
  declarations: [
    AppComponent,
    StockTrackerComponent,
    StockSentimentComponent,
    StockDetailDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [StockTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
