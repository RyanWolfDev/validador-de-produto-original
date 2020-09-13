import { Routes } from "@angular/router";
import { HomeClienteComponent } from "./home/home.component";


export const PagesClienteRoutes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    { path: "cliente/home", component: HomeClienteComponent },
];
