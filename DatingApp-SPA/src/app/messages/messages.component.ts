import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageParams: any = {};

  constructor(private userService: UserService, private alertify: AlertifyService,
     private route: ActivatedRoute, private authService: AuthService ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
    this.messageParams.pageNumber = this.pagination.currentPage;
    this.messageParams.pageSize = this.pagination.pageSize;
    this.messageParams.messageContainer = 'Unread';
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodeToken.nameid, this.messageParams).subscribe(d => {
      this.messages = d.result;
      this.pagination = d.pagination;
    }, e => {
      this.alertify.error(e);
    });
  }

  pageChanged(event: any) {
    this.messageParams.pageNumber = this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
