import { Routes } from "@angular/router";
import { LoginClienteComponent } from "./login/login.component";
import { SignupClienteComponent } from "./signup/signup.component";

export const AuthClienteRoutes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    { path: "login", component: LoginClienteComponent },
    { path: "signup", component: SignupClienteComponent },
];
