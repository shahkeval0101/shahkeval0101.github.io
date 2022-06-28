# Stocks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The code is deployed at github pages on following url
https://shahkeval0101.github.io/

Initially a parent component stock-tracker.component is loaded. <br>
In this component we have initially loaded data from local storage to display all the values that were added during last session. <br>
Once the app is loaded, Initially a form will be displayed in which we can search for the stocks. <br>
The form has validation for max length of characters in search box should be 5, Valid Symbol and Value already exists in the list are done. <br>
Once the proper value is searched, then we will call child component stock-detail-data.component.ts, In which we will call open source API Finnhub https://finnhub.io/ to get real time stock data of American stock exchange.<br>
There are 2 APIs called once the search button is clicked - <br>
1)Finnhub API - https://finnhub.io/docs/api/quote  to fetch stock details like opening pice, high price, percentage change, current price, low price. <br>
2) Finnhub API - https://finnhub.io/docs/api/symbol-search to fetch company stock details. <br>

Once the value is fetched we will check if data retrieved is proper then we add value to the list and reset form. <br>
Else we will setErrors accordingly .<br>

There is also one close button which will help to delete the particular stock from the list. <br>
If the list size is more than 20 than on refresh will we clear the list. <br>
On the details component we are displaying svg arrows to show if the there is positive change in the stock or negative change in the stock accordingly green and red arrows are shown. svg arrow url - https://icons.getbootstrap.com/icons/arrow-down/ . <br>

Each card has special button to know the sentiments of that stock from current date to past 3 months sentiments using the finnhub API https://finnhub.io/docs/api/insider-sentiment .  <br>
By default it calls for the past three months, but depending upon the API response the number months shown can be less. <br>
The application is built with Finnhub Open source API, Angular and Angular Material library and Bootstrap. <br>
The application is hosted on github pages https://shahkeval0101.github.io/. <br>
The source code is present at github https://github.com/shahkeval0101/shahkeval0101.github.io .<br>

