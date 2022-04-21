import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutProjectComponent } from './components/about-project/about-project.component';
import { AppComponent } from './app.component';
import { StockSentimentComponent } from './components/stock-sentiment/stock-sentiment.component';
import { StockTrackerComponent } from './components/stock-tracker/stock-tracker.component';

const routes: Routes = [
  {path : '',component: StockTrackerComponent},
  {path : 'sentiment/:symbol', component: StockSentimentComponent},
  {path : 'about-project', component: AboutProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
