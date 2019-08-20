import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;
  @Input() isLike: number; // 0 is none, 1 can send like, -1 can remove like
  @Output() loadPage = new EventEmitter();
  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodeToken.nameid, id).subscribe(() => {
      this.alertify.success('You have liked: ' + this.user.knownAs);
    }, e => {
      this.alertify.error(e);
    });
  }

  removeLike(id: number) {
    this.userService.removeLike(this.authService.decodeToken.nameid, id).subscribe(() => {
      this.alertify.success('You have remove like on : ' + this.user.knownAs);
    }, e => {
      this.alertify.error(e);
    }, () => {
      this.loadPage.emit(id);
    });
  }
}
