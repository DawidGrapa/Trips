import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ICart } from '../cart/ICart';

@Injectable({
    providedIn: 'root'
  })

export class CartItemServiceService {

    private cartItemsCollectionName = 'cartItems';
    private client: AngularFireList<ICart>;
  
    constructor(private db: AngularFireDatabase) {
      this.client = db.list(this.cartItemsCollectionName);
    }
  
    getData(): AngularFireList<any>{
      return this.client;
    }
  
    deleteCartItem(key: string): void{
      this.client.remove(key);
    }
  
    addCartItem(cartItem: ICart): void{
      this.client.set(cartItem.name, {...cartItem});
    }
  
    updateCartItem(key: string, value: any): void{
      this.client.update(key, value);
    }
  }