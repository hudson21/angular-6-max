import { Recipe } from "../recipes.model";
import { Ingredient } from "src/app/shared/ingredient.model";

export interface RecipeState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
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
    ]
};

export function recipeReducer(state = initialState, action) {
    return state;
}
