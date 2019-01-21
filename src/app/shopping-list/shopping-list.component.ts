import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//Models
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
    
export class ShopppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    private subscription: Subscription;
    
    constructor(private slService: ShoppingListService){}

    ngOnInit(){
        this.ingredients = this.slService.getIngredients();
        this.subscription = this.slService.ingredientsChanged
            .subscribe(
                (ingreedients: Ingredient[]) => {
                    this.ingredients= ingreedients;
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

};