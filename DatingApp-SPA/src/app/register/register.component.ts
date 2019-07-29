import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {}; /**initial empty object */

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => { /** no response */
        console.log('registration successful');
      }, error => {
        console.log(error);
      });
    console.log(this.model);
  }

  cancel(){
    this.cancelRegister.emit(false); /**parameter can use as object or simple bool like false */
    console.log('cancelled');
  }
}
