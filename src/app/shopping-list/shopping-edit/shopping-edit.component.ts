import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
//import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  //editedItemIndex: number;
  editedItem: Ingredient;

  constructor(/*private slService: ShoppingListService,*/
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }else {
          this.editMode = false;
        }
      }
    );
    //Here we are catching the data from the observable emitted in shopping-list-component
    /*this.subscription = this.slService.startedEditing.subscribe((id: number) => {
      this.editedItemIndex = id;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(id);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });*/
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log('value', value);
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({
        ingredient: newIngredient
      }));
    }else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();//Clear the form if we delete an item
  }
  
  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }

}
