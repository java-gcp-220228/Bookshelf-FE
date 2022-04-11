import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { LoginComponent } from './components/login/login.component';
import { ManagerComponent } from './components/manager/manager.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterComponent } from './components/register/register.component';
import { RentDetailManagementComponent } from './components/rent-detail-management/rent-detail-management.component';
import { RentManagementComponent } from './components/rent-management/rent-management.component';
import { RenterComponent } from './components/renter/renter.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default path will be login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // those are the conditional paths that control by the Role Guard
  {
    path: 'renter',
    component: RenterComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 2 },
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 1 },
  },
  {
    path: 'manager-rent',
    component: RentManagementComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 1 },
  },
  {
    path: 'manager-rent-detail',
    component: RentDetailManagementComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 1 },
  },
  { path: 'forbidden', component: ForbiddenComponent },

  // wildcard path need to go last
  { path: '**', component: Page404Component }, // page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
