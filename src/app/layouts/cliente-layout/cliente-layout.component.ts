import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthClienteService } from './auth/auth-cliente.service';


@Component({
  selector: 'app-cliente-layout',
  templateUrl: './cliente-layout.component.html',
  styleUrls: ['./cliente-layout.component.scss']
})
export class ClienteLayoutComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private authClienteService: AuthClienteService
  ) { }

  ngOnInit() {
    this.authClienteService.autoAuthUser();

    this.userIsAuthenticated = this.authClienteService.getIsAuth();
    this.authListenerSubs = this.authClienteService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
