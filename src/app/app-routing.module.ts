import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopppingListComponent } from './shopping-list/shopping-list.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes =[
    //Only redirect if the full path is empty
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', component: ShopppingListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],//forRoot is only for the root module
    exports: [RouterModule]
})
export class AppRoutingModule {

}