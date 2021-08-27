import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AlertifyService } from '../../../shared/util/services/alertify.service';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from '../../../ngrx/selectors/auth.selector';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isLoggedIn$ = this.store.pipe(select(isLoggedIn));

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router,
              private store: Store) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
