import { Routes } from "@angular/router";
import { NoticiaListaComponent } from "./noticia-lista/noticia-lista.component";
import { NoticiaComponent } from "./noticia.component";
import { NoticiaCadastroComponent } from "./noticia-cadastro/noticia-cadastro.component";


export const RouterConfigNoticia: Routes = [
    {
        path: '', component: NoticiaComponent,
        children: [
            { path: '', component: NoticiaListaComponent },
            { path: 'cadastro', component: NoticiaCadastroComponent},
            { path: 'cadastro/:id', component: NoticiaCadastroComponent }
        ]
    }
]
