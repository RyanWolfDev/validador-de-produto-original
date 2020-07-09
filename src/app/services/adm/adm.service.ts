import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Adm, AdmResponse } from "../../models/adm.model";

import { AppService } from "../../app.service";

@Injectable({
  providedIn: "root",
})
export class AdmService {
  private data: Adm[] = [];
  private dataUpdated = new Subject<AdmResponse>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private appService: AppService
  ) {}

  getAdms(pageSize: number, currentPage: number, filterSeach: string = "") {
    const queryParams = `?limit=${pageSize}&page=${currentPage}&filterSearch=${filterSeach}`;
    this.http
      .get<AdmResponse>(this.appService.getApiUrl() + "/adm" + queryParams)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .subscribe((transformedData) => {
        this.data = transformedData.result;
        this.dataUpdated.next({
          result: [...this.data],
          message: transformedData.message,
          count: transformedData.count,
          currentPage: transformedData.currentPage,
          pageSize: transformedData.pageSize,
        });
      });
  }

  updateAdm(adm: Adm) {
    this.http
      .put(this.appService.getApiUrl() + "/adm/" + adm.id, adm)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/admin/adm"]);
      });
  }

  getDataUpdatedListener() {
    return this.dataUpdated.asObservable();
  }
}
