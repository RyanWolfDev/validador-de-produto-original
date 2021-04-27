import { Routes } from "@angular/router";
import { AuthClienteComponent } from "./auth/auth-cliente.component";
import { PagesClienteComponent } from "./pages/pages.component";
import { ClienteAuthGuard } from "./cliente-auth.guard";

export const ClienteLayoutRoutes: Routes = [
    {
        path: "",
        component: AuthClienteComponent,
        children: [
            {
                path: "",
                loadChildren:
                    "./auth/auth-cliente.module#AuthClienteModule",
            },
        ],
    },
    {
        path: "",
        component: PagesClienteComponent,
        children: [
            {
                path: "",
                loadChildren:
                    "./pages/pages.module#PagesClienteModule",
                canActivate: [ClienteAuthGuard],
            },
        ],
    },
    { path: '**', redirectTo: 'login' }
];
