import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as RecipeActions from "../store/recipe.actions";
import * as fromRecipe from '../store/recipe.reducers';
import { Recipe } from "../recipes.model";

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
    //this.httpClient.get<Recipe[]>(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json?auth=${token}`
      return this.httpClient.get<Recipe[]>(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json`,
        {
          observe: "body",
          responseType: "json"
        })  
    })
    .map(
      (recipes) => {
        console.log(recipes);
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json', 
      state.recipes, {reportProgress: true});
      return this.httpClient.request(req);
    });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}
}