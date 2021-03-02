import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ITour } from '../ITour';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input() minPrice = 0;
  @Input() maxPrice = 0;
  @Input() trips:ITour[] = [];

  @Output() rate = new EventEmitter();
  @Output() minDate = new EventEmitter();
  @Output() maxDate = new EventEmitter();
  @Output() minPriceEmit = new EventEmitter();
  @Output() maxPriceEmit = new EventEmitter();
  @Output() countriesEmit = new EventEmitter();
  countries = new Array();
  chosenMinPrice = -1;
  chosenMaxPrice = -1;
  countriesToShow = [];
  todayDate = new Date();
  chosenMinDate = new Date();
  chosenMaxDate = new Date(2100,12,12);
  chosenRate = -1;

  priceMinChanged(event: any):void{
      this.chosenMinPrice=parseInt(event.target.value,10);
      this.minPriceEmit.emit(this.chosenMinPrice);
  }
  priceMaxChanged(event: any):void {
    this.chosenMaxPrice=parseInt(event.target.value,10);
    this.maxPriceEmit.emit(this.chosenMaxPrice);
  }

  constructor() {
    
  }

  ngOnInit(): void {
    this.chosenMaxPrice=this.maxPrice;
    this.chosenMinPrice=this.minPrice;
    for(let i=0;i<this.trips.length;i++){
      if(!this.countriesToShow.includes(this.trips[i]['country']))
        this.countriesToShow.push(this.trips[i]['country']);
    }
  }
  ngOnChanges(changes: SimpleChanges): void{
    this.countriesToShow = [];
    for (let trip of this.trips){
      if (!this.countriesToShow.includes(trip.country)){
        this.countriesToShow.push(trip.country);
      }
    }
    for(let country of this.countries){
        if(!this.countriesToShow.includes(country)){
          this.countries.splice(this.countries.indexOf(country),1);
        }
    }
    this.chosenMaxPrice=this.maxPrice;
    this.chosenMinPrice=this.minPrice;
    this.minPriceEmit.emit(this.chosenMinPrice);
    this.maxPriceEmit.emit(this.chosenMaxPrice);
    this.countriesEmit.emit(this.countries);
    this.rate.emit(this.chosenRate);
  }

  rateChange(rate: number):void{
      this.chosenRate=rate;
      this.rate.emit(this.chosenRate);
  }

  startDateChanged(event: any):void{
    this.chosenMinDate = event.target.value;
    this.minDate.emit(this.chosenMinDate);
  }
  endDateChanged(event: any):void {
    this.chosenMaxDate = event.target.value;
    this.maxDate.emit(this.chosenMaxDate);
  }
  changeCountries(event: any): void{
    if (event.target.checked){
      this.countries.push(event.target.name);
    }else{
      for (let i = 0; i < this.countries.length; i++){
      if (this.countries[i] === event.target.name){
        this.countries.splice(i, 1);
      }
    }
    }
    this.countriesEmit.emit(this.countries);
  }
  resetRate():void{
    this.chosenRate = -1;
    this.rate.emit(this.chosenRate);
  }
}
