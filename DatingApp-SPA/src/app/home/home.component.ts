import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  constructor() { }

  ngOnInit() {/**do after constructor*/
  }

  registerToggle() {
    this.registerMode = true;
  }

  /** function that can emit from other component */
  cancelRegister(emitParm1: boolean) {
    this.registerMode = emitParm1; /** false */
  }

}
