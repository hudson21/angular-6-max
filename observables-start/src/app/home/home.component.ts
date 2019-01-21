import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Observer, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObservableSubscription: Subscription;
  customObservableSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNumbers = Observable.interval(1000)
          .pipe(map((data: number) => {
            return data * 2;
          }));
    this.numbersObservableSubscription = myNumbers.subscribe((number: number) => {
      console.log(number);
    });
    
    //Create an observable
    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('first package'); //It pushes to the next data package
      },2000);
      setTimeout(() => {
        observer.next('second package'); //It pushes to the next data package
      },4000);
      setTimeout(() => {
        //observer.error('this does not work'); //It pushes to the next data package
        observer.complete();
      },5000);
      setTimeout(() => {
        observer.next('third package'); //It pushes to the next data package
      },6000);
    });
    this.customObservableSubscription =  myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: string) => { console.log(error); },
      () => { console.log('Completed'); }
    );
  }

  ngOnDestroy() {
    this.numbersObservableSubscription.unsubscribe();
    this.customObservableSubscription.unsubscribe();
  }

}
