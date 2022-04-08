import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManagerComponent } from './components/manager/manager.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterComponent } from './components/register/register.component';
import { RenterComponent } from './components/renter/renter.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default path will be login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'renter', component: RenterComponent },
  { path: 'manager', component: ManagerComponent },

  // wildcard path need to go last
  { path: '**', component: Page404Component }, // page not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
