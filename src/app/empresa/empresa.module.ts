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

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { EmpresaComponent } from './empresa.component';
import { EmpresaListaComponent } from './empresa-lista.component';
import { EmpresaCadastroComponent } from './empresa-cadastro.component';
import { RouterConfigEmpresa } from './empresa.route';

import { EmpresaService } from '../service/empresa.service';
import { RedeEmpresaService } from '../service/rede-empresa.service';
import { PlanoService } from '../service/plano.service';
import { StatusService } from '../service/status.service';
import { CnpjPipe } from '../utils/cnpj-pipe';

registerLocaleData(local_PT, 'pt');

@NgModule({
    declarations: [
        EmpresaComponent,
        EmpresaListaComponent,
        EmpresaCadastroComponent,
        CnpjPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        TagInputModule,
        FontAwesomeModule,
        RouterModule.forChild(RouterConfigEmpresa),
        AngularMultiSelectModule,
        Ng2SmartTableModule,
        CurrencyMaskModule,
        Ng4LoadingSpinnerModule.forRoot(),
        ToasterModule.forRoot(),
        NgxMaskModule.forRoot(),
    ],
    exports: [
        RouterModule, 
        EmpresaComponent,
        EmpresaListaComponent,
        EmpresaCadastroComponent,
        CnpjPipe
    ],
    providers: [
        EmpresaService,
        RedeEmpresaService,
        PlanoService,
        StatusService,
        { provide: LOCALE_ID, useValue: 'pt' },
    ]
})
export class EmpresaModule {
    constructor() {
        library.add(fas, far);
    }
}
