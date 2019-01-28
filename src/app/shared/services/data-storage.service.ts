import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from "./recipe.service";
import { Recipe } from "src/app/recipes/recipes.model";
import { AuthService } from './auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        //With a put request I will override the existing data
      return  this.httpClient.put(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json?auth=${token}`,
            this.recipeService.getRecipes()) ;
    }

    getRecipes() {
       const token = this.authService.getToken();

       //this.httpClient.get<Recipe[]>(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json?auth=${token}`)
       this.httpClient.get<Recipe[]>(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json?auth=${token}`, {
          observe: 'body',
          responseType: 'json' //json is the default if you dont add it
       })     
       .map((recipes) => {
                for(let recipe of recipes) {
                    if(!recipe['ingredients']){
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    } 
                }
                return recipes;
            })
            .subscribe((recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            });
    }
}  