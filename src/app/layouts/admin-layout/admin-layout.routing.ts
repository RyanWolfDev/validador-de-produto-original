import { Routes } from "@angular/router";
import { PagesAdminComponent } from "./pages/pages.component";
import { AdminAuthGuard } from "./admin-auth.guard";
import { LoginAdminComponent } from "./auth/login-admin.component";
import { PagesAdminModule } from "./pages/pages.module";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    component: LoginAdminComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./auth/login-admin.module#LoginAdminModule",
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
