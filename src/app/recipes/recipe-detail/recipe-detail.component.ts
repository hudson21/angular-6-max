import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

//import { Recipe } from '../recipes.model';
//import { RecipeService } from 'src/app/shared/services/recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
//import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(//private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
  //With this observable we will be watching any changes on the id property taken by the URL
    this.route.params
        .subscribe((params: Params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        }); 
  }

  onAddToShoppingList() {
    this.store.select('recipes')
        .take(1)//To make sure this does not fire on every state change
        .subscribe((recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients(
            recipeState.recipes[this.id].ingredients)
            );
        });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
