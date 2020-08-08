import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { LoginModelData, LoginModelResponse } from "../../models/login.model";
import { AppService } from "../../app.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private appService: AppService
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(userLogin: LoginModelData) {
    this.http
      .post<LoginModelResponse>(
        this.appService.getApiUrl() + "/adm/login",
        userLogin
      )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if (token) {
            console.log(response.expiresIn);
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.adm_id;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiresInDuration);
            this.saveAuthData(response, expirationDate);
            this.router.navigate(["admin/dashboard"]);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiresIn.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(userData: LoginModelResponse, expirationDate: Date) {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userId", userData.adm_id.toString());
    localStorage.setItem("login", userData.login);
    localStorage.setItem("expiresIn", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("login");
    localStorage.removeItem("expiresIn");
  }

  getAuthData() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const login = localStorage.getItem("login");
    const expiresIn = localStorage.getItem("expiresIn");
    if (!token && !expiresIn) {
      return;
    }
    return {
      token: token,
      userId: parseInt(userId),
      login: login,
      expiresIn: new Date(expiresIn),
    };
  }
}
