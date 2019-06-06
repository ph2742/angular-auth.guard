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
import { QuillModule } from '../../vendor/libs/quill/quill.module';
import { LOCALE_ID } from "@angular/core";
import local_PT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { BeneficioComponent } from './beneficio.component';
import { BeneficioListaComponent } from './beneficio-lista.component';
import { BeneficioCadastroComponent } from './beneficio-cadastro.component';
import { RouterConfigBeneficio } from './beneficio.route';

import { BeneficioService } from '../service/beneficio.service';
import { EmpresaService } from '../service/empresa.service';
import { BeneficioTipoService } from '../service/beneficio-tipo.service';
import { CategoriaService } from '../service/categoria.service';
import { StatusService } from '../service/status.service';

registerLocaleData(local_PT, 'pt');

@NgModule({
    declarations: [
        BeneficioComponent,
        BeneficioListaComponent,
        BeneficioCadastroComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        TagInputModule,
        QuillModule,
        FontAwesomeModule,
        AngularMultiSelectModule,
        Ng2SmartTableModule,
        CurrencyMaskModule,
        RouterModule.forChild(RouterConfigBeneficio),
        Ng4LoadingSpinnerModule.forRoot(),
        ToasterModule.forRoot(),
        NgxMaskModule.forRoot(),
    ],
    exports: [
        RouterModule,
        BeneficioComponent,
        BeneficioListaComponent,
        BeneficioCadastroComponent,
    ],
    providers: [
        BeneficioService,
        BeneficioTipoService,
        EmpresaService,
        CategoriaService,
        StatusService,
        { provide: LOCALE_ID, useValue: 'pt' },
    ],
})
export class BeneficioModule {
    constructor() {
        library.add(fas, far);
    }
}
