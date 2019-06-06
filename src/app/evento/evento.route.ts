import { Routes } from "@angular/router";
import { EventoListaComponent } from "./evento-lista/evento-lista.component";
import { EventoComponent } from "./evento.component";
import { EventoCadastroComponent } from "./evento-cadastro/evento-cadastro.component";

export const RouterConfigEvento: Routes = [
    {
        path: '', component: EventoComponent,
        children: [
            { path: '', component: EventoListaComponent },
            { path: 'cadastro', component: EventoCadastroComponent },
            { path: 'cadastro/:id', component: EventoCadastroComponent }
        ]
    }
]
