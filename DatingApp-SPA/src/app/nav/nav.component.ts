import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { tokenKey } from '@angular/core/src/view';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

 model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  loggedIn() {
   return this.authService.loggedIn();
  }

  logout() {
    this.authService.logout();
    this.alertify.message('logged out');
  }

  login() {
    /**use subscribe to get return value observable from authService.login() */
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('Logged in successfully');
      }, error => {
        this.alertify.error(error);
      }
    );
  }

}
