import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { HomeComponent } from "./home/home.component";

//import { ShoppingListService } from "../shared/services/shopping-list.service";
//import { RecipeService } from "../shared/services/recipe.service";
//import { DataStorageService } from "../shared/services/data-storage.service";
//import { AuthService } from "../shared/services/auth.service";

import { AuthInterceptor } from "../shared/auth.interceptor";
import { LoggingInterceptor } from "../shared/login.interceptor";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports:[
        SharedModule,
        AppRoutingModule
    ],
    exports:[
        AppRoutingModule,
        HeaderComponent
    ],
    providers:[      
        //ShoppingListService, 
        //RecipeService, 
        //DataStorageService, 
        //AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    ]
})
export class CoreModule {

}