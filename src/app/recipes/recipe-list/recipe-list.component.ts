import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Models
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 
    'This is simply a test',
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg'
    ),
    new Recipe('Another Recipe', 
    'The description of another recipe',
    'https://images.media-allrecipes.com/images/56589.png'
    )
  ]; //The var is being declared a Recipe Model Array

  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
