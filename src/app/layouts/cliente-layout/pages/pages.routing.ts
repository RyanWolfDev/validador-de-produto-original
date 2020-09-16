import { Routes } from "@angular/router";
import { ClienteProfileComponent } from "./cliente/profile/profile.component";
import { ValidarProdutoClienteComponent } from "./validarProduto/validarProduto.component";


export const PagesClienteRoutes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    { path: "cliente/validarProduto", component: ValidarProdutoClienteComponent },
    { path: "cliente/profile", component: ClienteProfileComponent },

];
