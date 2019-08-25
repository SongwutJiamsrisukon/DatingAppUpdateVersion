import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

    messageParams: any = {};

    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService, private authService: AuthService) {}
    // use service before routing
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        //  resolve is auto use subscibe, but we need to catch error(use pipe)
        this.messageParams.pageNumber = 1;
        this.messageParams.pageSize = 5;
        this.messageParams.messageContainer = 'Unread';
        return this.userService.getMessages(this.authService.decodeToken.nameid, this.messageParams).pipe(
            catchError( e => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['']);
                return of(null); // return observable null
            })
        );
    }
}
