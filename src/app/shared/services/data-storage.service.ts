import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from "./recipe.service";
import { Recipe } from "src/app/recipes/recipes.model";


@Injectable()
export class DataStorageService {
    constructor(private http: Http,
                private recipeService: RecipeService) {}

    storeRecipes() {
        //With a put request I will override the existing data
      return  this.http.put(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json`,
            this.recipeService.getRecipes()) ;
    }

    getRecipes() {
       this.http.get(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json`)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json();
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