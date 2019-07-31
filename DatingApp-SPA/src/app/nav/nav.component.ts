import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { tokenKey } from '@angular/core/src/view';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

 model: any = {};

  constructor(private authServince: AuthService) { }

  ngOnInit() {
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // !! is had return true else return false
    return !!token;
  }

  login(){
    /**use subscribe to get return value observable from authServince.login() */
    this.authServince.login(this.model).subscribe(
      next => {
        console.log('Logged in successfully');
      }, error => {
        console.log(error);
      }
    );
  }

}
