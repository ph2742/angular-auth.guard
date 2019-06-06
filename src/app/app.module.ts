import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ToasterModule } from 'angular2-toaster';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

// *******************************************************************************
// NgBootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// *******************************************************************************
// App

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';

// *******************************************************************************
// Pages

import { HomeComponent } from './home/home.component';
import { Page2Component } from './page-2/page-2.component';

// *******************************************************************************
//

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { LoginComponent } from './usuario/login.component';
import { AuthService } from './service/auth.service';
import { ErrorInterceptor } from './service/error-handler.service';
import { AutenticateService } from '../app/service/autenticate.service';

@NgModule({
    declarations: [
        AppComponent,

        // Pages
        HomeComponent,
        Page2Component,
        LoginComponent
    ],

    imports: [
        BrowserModule,
        NgbModule.forRoot(),

        // App
        AppRoutingModule,
        LayoutModule,

        BrowserAnimationsModule,

        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        HttpClientModule, 
        ToasterModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
    ],

    providers: [
        Title,
        AppService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        AutenticateService
    ],

    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
