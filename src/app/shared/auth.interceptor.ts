import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import 'rxjs/add/operator/take';
import 'rxjs';

//import { AuthService } from "./services/auth.service";
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(/*private authService: AuthService*/
                private store:Store<fromApp.AppState>){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted', request);
        //const copiedRequest = request.clone({headers: request.headers.set('', '')});
        return this.store.select('auth')
        .take(1)
        .switchMap((authState: fromAuth.State) => {
            const copiedRequest = request.clone({params: request.params.set('auth', authState.token)});
            return next.handle(copiedRequest);
        }) 
        
    }
} 