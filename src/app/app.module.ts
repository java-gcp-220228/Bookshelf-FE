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
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RenterComponent } from './components/renter/renter.component';
import { ManagerComponent } from './components/manager/manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    Page404Component,
    RenterComponent,
    ManagerComponent,
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
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
