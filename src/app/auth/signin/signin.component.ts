import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
//import { AuthService } from 'src/app/shared/services/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(/*private authService: AuthService*/
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    //this.authService.signinUser(email, password);
    this.store.dispatch(new AuthActions.TrySignin({username:email, password: password}));
  }

}
