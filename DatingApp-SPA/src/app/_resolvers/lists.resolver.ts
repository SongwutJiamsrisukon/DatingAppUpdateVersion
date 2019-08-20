import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {

    pageNumber = 1;
    pageSize = 5;
    userParams: any = {};

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}
    // use service before routing
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        //  resolve is auto use subscibe, but we need to catch error(use pipe)
        this.userParams.typeOfLike = 'Likers';
        return this.userService.getUsers(this.pageNumber, this.pageSize, this.userParams).pipe(
            catchError( e => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['']);
                return of(null); // return observable null
            })
        );
    }
}
