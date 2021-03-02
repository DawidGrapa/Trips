import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITour } from '../ITour';


@Injectable({
    providedIn: 'root'
})

export class TripProviderService {  

    private client: AngularFireList<ITour>;
    private tourCollectionName = 'tours';

    constructor(private db: AngularFireDatabase) {
      this.client = db.list(this.tourCollectionName);
    }

    addTour(tour: ITour): void{
        this.client.set(tour.name, {...tour});
      }

    deleteTrip(key: string): void{
      this.client.remove(key);
    }
    getData(): AngularFireList<any>{
      return this.client;
    }
    getTrip(key: string): Observable<any>{
      let tempClient: AngularFireObject<ITour> = this.db.object(this.tourCollectionName + '/'+ key);
      return tempClient.snapshotChanges().pipe(map(changes => ({ key: changes.payload.key, ...changes.payload.val() })));
    }
    updateTrip(key: string, value: any): void{
      this.client.update(key,value);
    }
}