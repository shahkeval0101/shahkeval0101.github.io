import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';

import { AboutProjectComponent } from './about-project/about-project.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
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
    StockDetailDataComponent,
    AboutProjectComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [StockTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
