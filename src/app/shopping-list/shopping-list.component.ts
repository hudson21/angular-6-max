import { Component, OnInit/*, OnDestroy*/ } from '@angular/core';
import { /*Subscription ,*/ Observable } from 'rxjs';
import { Store } from '@ngrx/store';

//Models
import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from '../shared/services/shopping-list.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
    
export class ShopppingListComponent implements OnInit/*OnDestroy */  {
    shoppingListState: Observable<{ingredients: Ingredient[]}>;
    //private subscription: Subscription;
    
    constructor(/*private slService: ShoppingListService,*/
                private store: Store<fromApp.AppState>){}

    ngOnInit(){
        this.shoppingListState = this.store.select('shoppingList');
        /*this.subscription = this.slService.ingredientsChanged
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.ingredients = ingredients;
                }
            );*/
    }

    /*ngOnDestroy() {
        this.subscription.unsubscribe();
    }*/

    onEditItem(id: number) {
        //Here we are emiting the id in an observable
        this.store.dispatch(new ShoppingListActions.StartEdit(id));
    }

};