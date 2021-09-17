import { Injectable }          from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService  }        from './auth.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
      private router: Router,
      private auth:   AuthService
    ) { }

    canActivate(): boolean {
        if ( this.auth.logedIn() ) {
            return true;
        }
console.log(this.auth.logedIn());
        this.router.navigate(['/login']);
        return false;
    }
}
