import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterConfigEvento } from './evento.route';
import { EventoComponent } from './evento.component';
import { EventoListaComponent } from './evento-lista/evento-lista.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ToasterModule } from 'angular2-toaster';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from "ngx-currency-mask";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { EventoCadastroComponent } from './evento-cadastro/evento-cadastro.component';
import { TagInputModule } from 'ngx-chips';
import { QuillModule } from '../../vendor/libs/quill/quill.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LOCALE_ID } from "@angular/core";
import local_PT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { EventoService } from '../service/evento.service';
import { CategoriaService } from '../service/categoria.service';
import { StatusService } from '../service/status.service';

registerLocaleData(local_PT, 'pt');

@NgModule({
    declarations: [
        EventoComponent,
        EventoListaComponent,
        EventoCadastroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        TagInputModule,
        AngularMultiSelectModule,
        QuillModule,
        FontAwesomeModule,
        CurrencyMaskModule,
        RouterModule.forChild(RouterConfigEvento),
        Ng4LoadingSpinnerModule.forRoot(),
        ToasterModule.forRoot(),
        NgxMaskModule.forRoot(),
    ],
    exports: [
      RouterModule,
      EventoComponent,
      EventoListaComponent,
      EventoCadastroComponent
    ],
    providers: [
      EventoService,
      CategoriaService,
      StatusService,
      { provide: LOCALE_ID, useValue: 'pt' },
    ],
})
export class EventoModule {
    constructor() {
        library.add(fas, far);
    }
}
