import { Routes } from "@angular/router";
import { PagesAdminComponent } from "./pages/pages.component";
import { AdminAuthGuard } from "./admin-auth.guard";
import { AuthAdminComponent } from "./auth/auth-admin.component";
import { PagesAdminModule } from "./pages/pages.module";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    component: AuthAdminComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./auth/auth-admin.module#LoginAdminModule",
      },
    ],
  },
  {
    path: "",
    component: PagesAdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: "",
        // loadChildren: './pages/pages.module#PagesAdminModule',
        loadChildren: () => PagesAdminModule,
        canActivate: [AdminAuthGuard],
      },
    ],
  },
];
