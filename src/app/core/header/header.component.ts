import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { DataStorageService } from '../../shared/services/data-storage.service';
//import { AuthService } from '../../shared/services/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    authState: Observable<fromAuth.State>;

    constructor(private dataStorageService: DataStorageService,
                /*private authService: AuthService,*/
                private store: Store<fromApp.AppState>){}
    
    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe((response: HttpEvent<Object>) => 
                console.log(response.type === HttpEventType.Sent));
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    /*isAuthenticated() {
        return this.authService.isAuthenticated();
    }*/
} 