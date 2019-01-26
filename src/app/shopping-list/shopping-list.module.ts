import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ShopppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";


@NgModule({
    declarations:[
        ShopppingListComponent,
        ShoppingEditComponent
    ],
    imports:[
        CommonModule,
        FormsModule
    ]
})
export class ShoppingListModule {}