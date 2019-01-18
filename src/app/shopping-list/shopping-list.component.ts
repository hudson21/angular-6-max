import { Component } from '@angular/core';

//Models
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
    
export class ShopppingListComponent {
    ingredients: Ingredient[];
    
    constructor(private slService: ShoppingListService){
    
    }

    ngOnInit(){
        this.ingredients = this.slService.getIngredients();
        this.slService.ingredientsChanged
            .subscribe(
                (ingreedients: Ingredient[]) => {
                    this.ingredients= ingreedients;
                }
            );
    }

};