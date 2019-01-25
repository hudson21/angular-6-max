import { Component } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService){}
    
    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe((response: Response) => console.log(response));
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
} 