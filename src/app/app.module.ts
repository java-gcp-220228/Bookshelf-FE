import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { Page404Component } from './components/page404/page404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserService } from './services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RenterComponent } from './components/renter/renter.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { RoleGuard } from './guards/role.guard';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BookManagementDialogComponent } from './components/book-management-dialog/book-management-dialog.component';
import { RentManagementComponent } from './components/rent-management/rent-management.component';
import { RentDetailManagementComponent } from './components/rent-detail-management/rent-detail-management.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AvailibityPipe } from './pipes/availibity.pipe';
import { CartComponent } from './components/cart/cart.component';
import { RentsComponent } from './components/rents/rents.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    Page404Component,
    RenterComponent,
    ManagerComponent,
    ForbiddenComponent,
    ConfirmDialogComponent,
    BookManagementDialogComponent,
    BookManagementDialogComponent,
    RentManagementComponent,
    RentDetailManagementComponent,
    SidebarComponent,
    AvailibityPipe,
    CartComponent,
    RentsComponent,
    FooterComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    RoleGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
