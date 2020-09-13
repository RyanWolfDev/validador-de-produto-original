import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-auth-cliente',
  templateUrl: './auth-cliente.component.html',
  styleUrls: ['./auth-cliente.component.scss']
})
export class AuthClienteComponent implements OnInit {

  activeNav = 1;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/signup') {
      this.activeNav = 2;
    }
  }
}
