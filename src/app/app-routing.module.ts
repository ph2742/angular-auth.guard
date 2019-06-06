import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';

// *******************************************************************************
// Pages

import { LoginComponent } from '../app/usuario/login.component';
import { HomeComponent } from '../app/home/home.component';
import { Page2Component } from '../app/page-2/page-2.component';
import { AuthService } from '../app/service/auth.service';

// *******************************************************************************
// Routes

const routes: Routes = [
    {
        path: '', canActivate: [AuthService], component: Layout1Component, pathMatch: 'full', 
        children: [
            { path: '', component: HomeComponent }
        ]
    },
    {
        path: 'page-2', canActivate: [AuthService], component: Layout1Component, 
        children: [
            { path: '', component: Page2Component }
        ]
    },
    {
        path: 'noticia', canActivate: [AuthService], component: Layout1Component, 
        children: [
            { path: '', loadChildren: 'app/noticia/noticia.module#NoticiaModule' }
        ]
    },
    {
        path: 'empresa', canActivate: [AuthService], component: Layout1Component, 
        children: [
            { path: '', loadChildren: 'app/empresa/empresa.module#EmpresaModule' }
        ]
    },
    {
        path: 'evento', canActivate: [AuthService], component: Layout1Component, 
        children: [
            { path: '', loadChildren: 'app/evento/evento.module#EventoModule' }
        ]
    },
    {
        path: 'beneficio', canActivate: [AuthService], component: Layout1Component, 
        children: [
            { path: '', loadChildren: 'app/beneficio/beneficio.module#BeneficioModule' }
        ]
    },
    { 
        path: 'login',  component: LoginComponent 
    }
];

// *******************************************************************************
//

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
