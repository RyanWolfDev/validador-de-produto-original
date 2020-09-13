import { Routes } from "@angular/router";
import { AuthClienteComponent } from "./pages/auth/auth-cliente.component";

export const ClienteLayoutRoutes: Routes = [
    {
        path: "",
        component: AuthClienteComponent,
        children: [
            {
                path: "",
                loadChildren:
                    "./pages/auth/auth-cliente.module#AuthClienteModule",
            },
        ],
    },
];
