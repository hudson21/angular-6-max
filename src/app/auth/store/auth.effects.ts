import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

@Injectable
export class AuthEffects {
    @Effect()
    authSignup = this.actions$; 

    constructor(private actions$: Actions) {

    }
}