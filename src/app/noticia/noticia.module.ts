import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToasterModule } from 'angular2-toaster';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from "ngx-currency-mask";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LOCALE_ID } from "@angular/core";
import local_PT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { QuillModule } from '../../vendor/libs/quill/quill.module';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { NoticiaComponent } from './noticia.component';
import { NoticiaListaComponent } from './noticia-lista/noticia-lista.component';
import { NoticiaCadastroComponent } from './noticia-cadastro/noticia-cadastro.component';
import { RouterConfigNoticia } from './noticia.route';

import { NoticiaService } from '../service/noticia.service';
import { CategoriaService } from '../service/categoria.service';
import { StatusService } from '../service/status.service';

registerLocaleData(local_PT, 'pt');

@NgModule({
  declarations: [
    NoticiaComponent,
    NoticiaListaComponent,
    NoticiaCadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    TagInputModule,
    FontAwesomeModule,
    RouterModule.forChild(RouterConfigNoticia),
    AngularMultiSelectModule,
    Ng2SmartTableModule,
    CurrencyMaskModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ToasterModule.forRoot(),
    NgxMaskModule.forRoot(),
    QuillModule
  ],
  exports: [
    RouterModule,
    NoticiaComponent,
    NoticiaListaComponent,
    NoticiaCadastroComponent,
  ],
  providers: [
    NoticiaService,
    CategoriaService,
    StatusService,
    { provide: LOCALE_ID, useValue: 'pt' },
  ]
})
export class NoticiaModule {
  constructor() {
    library.add(fas, far);
  }
}
