import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { LocalUserData } from 'src/app/_models/localUserData';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.pageSize, null, this.likesParam).subscribe(d => {
      this.users = d.result;
      this.pagination = d.pagination;
    }, e => {
      this.alertify.error(e);
    });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
