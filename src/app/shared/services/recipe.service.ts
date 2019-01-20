import {  Injectable } from '@angular/core';

import { Recipe } from '../../recipes/recipes.model'; 
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()//Inject a Service into  a Service
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]
        ),
        new Recipe('Another Recipe', 
        'The description of another recipe',
        'https://images.media-allrecipes.com/images/56589.png',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ]
        )
    ]; //The var is being declared a Recipe Model Array

    constructor(private slService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice(); //This will return a new array which is a copy from the original one
    }

    getRecipe(id: number)  {
        //Slice will give you a copy of the original array
        //return this.recipes.slice()[id];
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}