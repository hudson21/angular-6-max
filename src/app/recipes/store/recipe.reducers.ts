import { Recipe } from "../recipes.model";
import { Ingredient } from "src/app/shared/ingredient.model";

import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

//This means that this interface has the recipeState, but it gets all the properties from the AppState
export interface FeatureState extends fromApp.AppState {
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

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions ) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };

        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };

        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe
            return {
                ...state,
                recipes: recipes
            };

        case (RecipeActions.DELETE_RECIPE):
            const deletedRecipes = [...state.recipes];
            deletedRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: deletedRecipes
            };
            
        default:
            return state;        
    }
    
}
