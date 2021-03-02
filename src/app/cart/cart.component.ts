import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartItemServiceService } from '../services/cart.service';
import { ICart } from './ICart';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  cartItems: ICart[] = [];

  constructor(private cartService: CartItemServiceService) { }

  ngOnInit(): void{
    this.readCartItems();
  }

  async readCartItems(): Promise<any>{
    await this.cartService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(cartItems =>{
      this.cartItems = cartItems;
    });
  }
  getSum(): number{
    let res = 0;
    this.cartItems.forEach(item =>{
      res += item.price * item.count;
    });
    return res;
  }

}
