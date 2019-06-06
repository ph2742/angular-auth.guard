import { Routes } from "@angular/router";
import { EmpresaListaComponent } from "./empresa-lista.component";
import { EmpresaComponent } from "./empresa.component";
import { EmpresaCadastroComponent } from "./empresa-cadastro.component";

export const RouterConfigEmpresa: Routes = [
    {
        path: '', component: EmpresaComponent,
        children: [
            { path: '', component: EmpresaListaComponent },
            { path: 'cadastro', component: EmpresaCadastroComponent },
            { path: 'cadastro/:id', component: EmpresaCadastroComponent},
        ]
    }
]