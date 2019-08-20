import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {

    userParams: any = {};

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}
    // use service before routing
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        //  resolve is auto use subscibe, but we need to catch error(use pipe)
        this.userParams.pageNumber = 1;
        this.userParams.pageSize = 5;
        this.userParams.typeOfLike = 'Likers';
        return this.userService.getUsers(this.userParams).pipe(
            catchError( e => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['']);
                return of(null); // return observable null
            })
        );
    }
}
