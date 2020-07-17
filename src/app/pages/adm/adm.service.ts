import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Adm } from "./adm.model";
import { DataTable } from "../../models/dataTable.model";

import { AppService } from "../../app.service";

@Injectable({
  providedIn: "root",
})
export class AdmService {
  private data: Adm[] = [];
  private dataUpdated = new Subject<DataTable>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private appService: AppService
  ) { }

  getAll(pageSize: number, currentPage: number, filterSeach: string = "") {
    const queryParams = `?limit=${pageSize}&page=${currentPage}&filterSearch=${filterSeach}`;
    this.http
      .get<DataTable>(this.appService.getApiUrl() + "/adm" + queryParams)
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

  save(adm: Adm) {
    this.http
      .post<Adm>(`${this.appService.getApiUrl()}/adm`, adm)
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(["/admin/adm"]);
      });
  }

  update(adm: Adm) {
    this.http
      .put(`${this.appService.getApiUrl()}/adm/${adm.id}`, adm)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/admin/adm"]);
      });
  }

  getById(id: string) {
    return this.http.get<{ message: string, result: Adm }>(`${this.appService.getApiUrl()}/adm/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.appService.getApiUrl()}/adm/${id}`);
  }

  getDataUpdatedListener() {
    return this.dataUpdated.asObservable();
  }
}
