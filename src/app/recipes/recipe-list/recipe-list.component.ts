import { Component, OnInit/*, OnDestroy*/ } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

//Models
//import { Recipe } from '../recipes.model';

//Services
//import { RecipeService } from 'src/app/shared/services/recipe.service';
import { /*Subscription,*/ Observable } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit/*, OnDestroy*/ {
  //subscription: Subscription
  recipeState: Observable<fromRecipe.State>;

  constructor(/*private recipeService: RecipeService,*/
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
    /*this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();*/
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  /*ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/

}
