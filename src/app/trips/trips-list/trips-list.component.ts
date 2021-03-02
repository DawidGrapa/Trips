import { Component, OnInit } from '@angular/core';
import { ITour } from './../../ITour';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SnapshotAction } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { TripProviderService } from 'src/app/services/tripProvider.service';
import { CartItemServiceService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit {



  trips!: ITour[];
  minPrice = 0;
  maxPrice = 0;
  participantSum = 0;
  filteredRate = -1;
  filteredMinDate = new Date();
  filteredMaxDate = new Date();
  defaultDate = new Date();
  filteredMinPrice = -1;
  filteredMaxPrice = -1;
  filteredCountries =[];

  constructor(private tripService: TripProviderService,private cartService: CartItemServiceService) { }

  async ngOnInit(): Promise<any> {
    await this.getTrips();
    await this.getCartItems();
  }

  async getCartItems(): Promise<any>{
    await this.cartService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(cartItems =>{
      this.participantSum = 0;
      cartItems.forEach(cartItem =>{
        this.participantSum += cartItem.count;
      });
    });
  }

  async getTrips(): Promise<any>{
    await this.tripService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tours =>{
      this.trips = tours;
      this.secondConstructor();
    });
  }
  secondConstructor(): void{
    this.trips.forEach(trip =>{
      trip.start_date = new Date(trip.start_date);
      trip.end_date = new Date(trip.end_date);
    });
    this.setMinMaxPrice();
  }

  setMinMaxPrice():void{
    const copy = [...this.trips];
    this.minPrice = copy.sort((a, b) => a.price - b.price)[0].price;
    this.maxPrice = copy.sort((a, b) => a.price - b.price)[copy.length - 1].price;
  }


  remove(which: number):void{
    if (confirm('Na pewno chcesz usunąć wycieczkę -> '+this.trips[which].name+'?')) {
      this.tripService.deleteTrip(this.trips[which].name);
    } 
  }


  receiveRate(event: any):void {
    this.filteredRate = event;
  }
  receiveMinDate(event: any):void{
    this.filteredMinDate = new Date(event);
  }
  receiveMaxDate(event: any): void{
    this.filteredMaxDate = new Date(event);
  }
  receiveMinPrice(event: any):void {
    this.filteredMinPrice = event;
  }
  receiveMaxPrice(event: any):void{
    this.filteredMaxPrice=event;
  }
  receiveCountries(event: any):void{
    this.filteredCountries=event;
  }

  filterValidation(index: number): boolean{
    let trip = this.trips[index];
    
    if (this.filteredCountries.length != 0 && !this.filteredCountries.includes(trip.country)) return false;
    if(!(this.filteredRate==-1))
      if(!(this.filteredRate==trip.rate))
        return false;
    if (this.filteredMinPrice !== -1 && trip.price < this.filteredMinPrice){
       return false;
    } 
    if (this.filteredMaxPrice !== -1 && trip.price > this.filteredMaxPrice){
      return false;
    }
    if (this.filteredMinDate.getTime() !== this.defaultDate.getTime() && this.filteredMinDate.getTime() > trip.start_date.getTime()){
      return false;
    }
    if (this.filteredMaxDate.getTime() !== this.defaultDate.getTime() && this.filteredMaxDate.getTime() < trip.end_date.getTime()){
      return false;
    }
    return true;
  }
}
