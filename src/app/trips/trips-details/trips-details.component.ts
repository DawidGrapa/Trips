import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireList } from '@angular/fire/database';
import { ActivatedRoute, Params } from '@angular/router';
import { ITour } from 'src/app/ITour';
import { TripProviderService } from 'src/app/services/tripProvider.service';
import { CartItemServiceService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-trips-details',
  templateUrl: './trips-details.component.html',
  styleUrls: ['./trips-details.component.css']
})
export class TripsDetailsComponent implements OnInit {

  trip!: ITour;
  tripKey!: string;
  participants = 0;
  constructor(private route: ActivatedRoute, private tripService: TripProviderService,private cartService: CartItemServiceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.tripKey = param.id;
    });
    this.tripService.getTrip(this.tripKey).subscribe(trip => {
      this.trip = trip;
    });
    this.cartService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(cartItems =>{
      cartItems.forEach(cartItem =>{
        if (cartItem.name === this.trip.name && cartItem.price === this.trip.price){
          this.participants = cartItem.count;
        }
      });
    });
  }

  updateRating(newRating: number): void {
    this.tripService.updateTrip(this.tripKey, {rate: newRating});
  }

  addParticipant(): void{
    this.participants++;
    if (this.participants === 1){
      this.cartService.addCartItem({name: this.trip.name, price: this.trip.price, count: this.participants});
    }else{
      this.cartService.updateCartItem(this.trip.name, {count: this.participants});
    }
  }
  removeParticipant(): void{
    this.participants--;
    this.cartService.updateCartItem(this.trip.name, {count: this.participants});
    if (this.participants === 0){
      this.cartService.deleteCartItem(this.trip.name);
    }
  }

}
