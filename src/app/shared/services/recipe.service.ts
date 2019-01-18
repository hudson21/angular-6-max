import { EventEmitter } from '@angular/core';

import { Recipe } from '../../recipes/recipes.model'; 


export class RecipeService {
    recipeSelected= new EventEmitter<Recipe>(); 

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 
        'This is simply a test',
        'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg'
        ),
        new Recipe('Another Recipe', 
        'The description of another recipe',
        'https://images.media-allrecipes.com/images/56589.png'
        )
    ]; //The var is being declared a Recipe Model Array

    getRecipes() {
        return this.recipes.slice(); //This will return a new array which is a copy from the original one
    }
}