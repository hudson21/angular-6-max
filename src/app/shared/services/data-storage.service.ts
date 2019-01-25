import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from "./recipe.service";
import { Recipe } from "src/app/recipes/recipes.model";
import { AuthService } from './auth.service';


@Injectable()
export class DataStorageService {
    constructor(private http: Http,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        //With a put request I will override the existing data
      return  this.http.put(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json?auth=${token}`,
            this.recipeService.getRecipes()) ;
    }

    getRecipes() {
       const token = this.authService.getToken();

       this.http.get(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json?auth=${token}`)
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