import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
                                                                                             //d: PaginationResult<User[]> =>
    this.userService.getUsers(this.pagination.currentPage, this.pagination.pageSize).subscribe(d => {
      this.users = d.result;
      this.pagination = d.pagination;
    }, e => {
      this.alertify.error(e);
    });
  }
}
