import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthAdminService } from './auth/auth-admin.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(
        private authAdminService: AuthAdminService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        this.authAdminService.autoAuthUser();
        const isAuth = this.authAdminService.getIsAuth();
        console.log(isAuth);
        if (!isAuth) {
            this.router.navigate(['/admin/login']);
        }
        return isAuth;
    }

}
