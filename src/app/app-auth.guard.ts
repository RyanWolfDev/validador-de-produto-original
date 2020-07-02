import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './services/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.loginService.getIsAuth();
    console.log(isAuth);
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }

}
