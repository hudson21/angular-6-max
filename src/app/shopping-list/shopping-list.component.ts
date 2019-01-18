import { Component } from '@angular/core';

//Models
import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
    
export class ShopppingListComponent {
    ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
    ];

    constructor(){
    
    }

    ngOnInit(){
    }

    onIngredientAdded(ingredient) {
        this.ingredients.push(ingredient);
    }

};