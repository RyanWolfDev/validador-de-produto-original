import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthClienteService } from './auth/auth-cliente.service';

@Injectable()
export class ClienteAuthGuard implements CanActivate {
  constructor(
    private authClienteService: AuthClienteService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    this.authClienteService.autoAuthUser();
    const isAuth = this.authClienteService.getIsAuth();
    console.log(isAuth);
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }

}
