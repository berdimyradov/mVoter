import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Containers
import { DefaultLayoutComponent } from "./containers";

import { P404Component } from "./views/error/404.component";
import { P500Component } from "./views/error/500.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { AuthGuard } from "./auth/auth.guard";
import { LogoutComponent } from "./views/logout/logout.component";
import { UsersComponent } from "./views/users/users.component";
import { UniversitiesComponent } from "./views/universities/universities.component";
import { AdminGuard } from "./auth/admin.guard";
import { AdminPageLayoutComponent } from "./views/admin/admin.page.layout.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "404",
    component: P404Component,
    data: {
      title: "Page 404"
    }
  },
  {
    path: "500",
    component: P500Component,
    data: {
      title: "Page 500"
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page"
    }
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "register",
    component: RegisterComponent,
    data: {
      title: "Register Page"
    }
  },
  {
    path: "admin",
    component: AdminPageLayoutComponent,
    children: [
      {
        path: "users",
        component: UsersComponent,
        pathMatch: "full",
        canActivate: [AdminGuard]
      },
      {
        path: "universities",
        component: UniversitiesComponent,
        pathMatch: "full",
        canActivate: [AdminGuard]
      }
    ]
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home"
    },
    children: [
      {
        path: "base",
        loadChildren: "./views/base/base.module#BaseModule"
      },
      {
        path: "buttons",
        loadChildren: "./views/buttons/buttons.module#ButtonsModule"
      },
      {
        path: "charts",
        loadChildren: "./views/chartjs/chartjs.module#ChartJSModule"
      },
      {
        path: "dashboard",
        loadChildren: "./views/dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "icons",
        loadChildren: "./views/icons/icons.module#IconsModule"
      },
      {
        path: "notifications",
        loadChildren:
          "./views/notifications/notifications.module#NotificationsModule"
      },
      {
        path: "theme",
        loadChildren: "./views/theme/theme.module#ThemeModule"
      },
      {
        path: "widgets",
        loadChildren: "./views/widgets/widgets.module#WidgetsModule"
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
