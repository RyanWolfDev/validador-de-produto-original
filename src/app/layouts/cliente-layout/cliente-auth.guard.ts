import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthClienteService } from './auth/auth-cliente.service';

@Injectable()
export class ClienteAuthGuard implements CanActivate {
  constructor(
    private clienteAuthService: AuthClienteService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.clienteAuthService.getIsAuth();
    console.log(isAuth);
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }

}
