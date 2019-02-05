import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipeService } from "./recipe.service";
import { Recipe } from "src/app/recipes/recipes.model";
import { AuthService } from './auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    //Set overrides all the existing parameters
    storeRecipes() {
        //const token = this.authService.getToken();
        //const headers = new HttpHeaders().set('Authorization', 'Bearer asdasdsasa');
        //With a put request I will override the existing data
      
        /*
            return  this.httpClient.put(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json`,
            this.recipeService.getRecipes(), {
                //observe: 'events',
                observe: 'body',
                //headers: headers
                params: new HttpParams().set('auth', token)
            }) ;
        */

        const req = new HttpRequest('PUT', 'https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json', 
        this.recipeService.getRecipes(), {reportProgress: true})
        return this.httpClient.request(req);
    }

    getRecipes() {
        
       //this.httpClient.get<Recipe[]>(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json?auth=${token}`)
       this.httpClient.get<Recipe[]>(`https://udemy-ng-http-8f4c2.firebaseio.com/recipes.json`, {
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