import { Routes } from "@angular/router";
import { BeneficioListaComponent } from "./beneficio-lista.component";
import { BeneficioComponent } from "./beneficio.component";
import { BeneficioCadastroComponent } from "./beneficio-cadastro.component";


export const RouterConfigBeneficio: Routes = [
    {
        path: '', component: BeneficioComponent,
        children: [
            { path: '', component: BeneficioListaComponent },
            { path: 'cadastro', component: BeneficioCadastroComponent },
            { path: 'cadastro/:id', component: BeneficioCadastroComponent },
        ]
    }
]