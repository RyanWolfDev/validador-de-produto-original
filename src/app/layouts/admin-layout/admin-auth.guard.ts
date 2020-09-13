import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './auth/auth-admin.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(
        private adminAuthService: LoginService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.adminAuthService.getIsAuth();
        console.log(isAuth);
        if (!isAuth) {
            this.router.navigate(['/admin/login']);
        }
        return isAuth;
    }

}
