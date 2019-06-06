import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';

import { MapperUtils } from '../utils/mapper-utils';
import { StringUtils } from '../utils/string.utils';
import { AppService } from '../app.service';
import { EmpresaService } from '../service/empresa.service';
import { RedeEmpresaService } from '../service/rede-empresa.service';
import { PlanoService } from '../service/plano.service';
import { StatusService } from '../service/status.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { RedeEmpresaFilter } from '../model/rede-empresa-filter';
import { RedeEmpresa } from '../model/rede-empresa';
import { SelectItem } from '../model/select-item';
import { Empresa } from '../model/empresa';
import { Plano } from '../model/plano';
import { Status } from '../model/status';
import { Anexo } from '../model/anexo';

@Component({
    selector: 'app-empresa-cadastro',
    templateUrl: '../empresa/empresa-cadastro.component.html',
    styleUrls: [
        '../../vendor/libs/quill/typography.scss',
        '../../vendor/libs/quill/editor.scss',
        '../empresa/empresa.component.scss'
    ],
    providers:[
        EmpresaService,
        RedeEmpresaService,
        PlanoService,
        StatusService,
    ]
})
export class EmpresaCadastroComponent implements OnInit {
    @ViewChild('redeEmpresaSel') selRedeEmp: AngularMultiSelect;
    @ViewChild('inputFile') inputFile;

    arraySelecionados: any = [];

    itemList = [];
    selectedItems = [];
    settings = {};

    empresa_id: string;
    title_empresa: string;
    filter_rede: RedeEmpresaFilter;
    empresa: Empresa;
    extensions: string[];
    
    dropdownListRede: SelectItem[];
    selectedItemRede: SelectItem[];
    loadingRede: boolean;

    dropdownListPlano: SelectItem[];
    selectedItemPlano: SelectItem[];

    dropdownListStatus: SelectItem[];
    selectedItemStatus: SelectItem[];

    dropdownListStates: SelectItem[];
    selectedItemStates: SelectItem[];

    dropdownSettingsSingleCustom: any;
    dropdownSettingsPlano: any;
    dropdownSettingsStatus: any;
    dropdownSettingsSingle: any = {
        singleSelection: true, 
        text: "Selecione ou digite e confirme uma rede para adicionar",
        enableCheckAll: false,
        enableSearchFilter: true,
        enableFilterSelectAll: false,
        maxHeight: 200,
        badgeShowLimit: 4,
        disabled: false,
        searchPlaceholderText: "Pesquisa por descrição",
        searchAutofocus: true,
        labelKey: 'itemName',
        primaryKey: 'id',
        noDataLabel: "Digite a descrição para pesquisa...",
        searchBy: ['itemName'],
        lazyLoading: true,
        showCheckbox: false,
        addNewItemOnFilter: true,
        addNewButtonText: 'Novo item',
    };
    dropdownSettings: any = {
        enableCheckAll: false,
        text: "Selecione",
    }
    
    constructor(private empresaService: EmpresaService, 
                private redeEmpresaService: RedeEmpresaService,
                private planoService: PlanoService,
                private statusService: StatusService,
                private router: Router,
                private route: ActivatedRoute,  
                private toasterService: ToasterService, 
                private appService: AppService, 
                private spinner: Ng4LoadingSpinnerService) {
        this.empresa = new Empresa();
        this.empresa.urlLogo = '';
        this.extensions = ["gif", "png", "jpeg", "jpg", "bmp", "webp"];
        this.filter_rede = new RedeEmpresaFilter();
        this.filter_rede.page = 0;
        this.filter_rede.page_size = 10;
        this.filter_rede.order = "Nome";
        this.filter_rede.decrescente = false;

        this.dropdownSettingsPlano = MapperUtils.getDropdownSettingsSingleDefault();
        this.dropdownSettingsStatus = MapperUtils.getDropdownSettingsSingleDefault();
        this.dropdownSettingsSingleCustom = MapperUtils.getDropdownSettingsSingleCustom();

        this.dropdownSettingsStatus.maxHeight = 130;
        this.dropdownSettingsStatus.enableFilterSelectAll = false;
        this.dropdownSettingsPlano.enableFilterSelectAll = false;
        this.dropdownSettingsSingleCustom.enableFilterSelectAll = false;

        this.selectedItemRede = [];
        this.selectedItemPlano = [];
        this.selectedItemStatus = [];
        this.selectedItemStates = [];

    }
    
    public ngOnInit() : any {
        console.log("AQUI NOME :", this.empresa.nomeFantasia)
        this.empresa_id = this.route.snapshot.paramMap.get('id');
        if(StringUtils.isNullOrEmpty(this.empresa_id)){
            this.title_empresa = 'Nova empresa';
            this.appService.pageTitle = 'Adicionar Empresa';
        } else {
            this.title_empresa = 'Editar empresa #' + this.empresa_id;
            this.appService.pageTitle = 'Editar Empresa';
        }
        
        this.searchStates();
        this.searchRede('');
        this.searchStatus();
        this.searchPlano();
        
        if(!StringUtils.isNullOrEmpty(this.empresa_id))
            this.load(this.empresa_id);

        this.settings = {
            classes: "myclass custom-class"
        };

    }

    onItemSelectStates(item: any) {
        let states = (new SelectItem().deserialize(item));
        this.empresa.uf = states.code;
        this.selectedItemStates = [];
        this.selectedItemStates.push(states);
    }

    onItemSelectStatus(item: any) {
        let status = (new SelectItem().deserialize(item));
        this.empresa.status = new Status().convert(status);
        this.selectedItemStatus = [];
        this.selectedItemStatus.push(status);
    }

    onItemSelectPlano(item: any) {
        let plano = (new SelectItem().deserialize(item));
        this.empresa.plano = new Plano().convert(plano);

        this.selectedItemPlano = [];
        this.selectedItemPlano.push(plano);

        var planos = []
        this.selectedItemPlano.forEach(c => {
           c.itemName;
           planos.push(c.itemName)
        })

        this.empresa.planosEscolhidos = planos.toString();
        console.log("Array com os planos :", planos)
        console.log("Model com planos escolhidos :", this.empresa.planosEscolhidos)
    }

    onItemSelectRede(item: any) {
        let rede = (new SelectItem().deserialize(item));
        this.empresa.rede = new RedeEmpresa().convert(rede);
        this.empresa.urlLogo = '';

        this.selectedItemRede = [];
        this.selectedItemRede.push(rede);
    }

    fetchMoreRede(event: any) {
        if(event.end <= 0 && event.start <= 0)
          return false;
    
        if (event.end === this.dropdownListRede.length - 1) {
            this.filter_rede.page = this.filter_rede.page + 1;
            this.loadingRede = true;
            this.redeEmpresaService.getToSelect(this.filter_rede).subscribe((data) => {
                let dataConv = Object.assign([], data).map(item => new SelectItem().deserialize(item));

                this.dropdownListRede = this.dropdownListRede.concat(dataConv);
                this.loadingRede = false;
            }, () => this.loadingRede = false);
        }
    }

    onSearchRede(evt: any) {
        this.searchRede(evt.target.value);
    }

    searchRede(name: string) {
        this.filter_rede.name = name;
        this.filter_rede.page = 0;
        this.dropdownListRede = [];
        this.redeEmpresaService.getToSelect(this.filter_rede).subscribe((data: any[]) => {

            this.dropdownListRede = 
            Object.assign([], data).map(item => new SelectItem().deserialize(item));

        });
    }

    searchStatus() {
        this.dropdownListStatus = [];
        this.statusService.getToSelectEmpresa().subscribe((data: any[]) => {

            this.dropdownListStatus = 
            Object.assign([], data).map(item => new SelectItem().deserialize(item));

        });
    }
    
    searchPlano() {
        this.dropdownListPlano = [];
        this.planoService.getToSelect().subscribe((data: any[]) => {

            this.dropdownListPlano = 
            Object.assign([], data).map(item => new SelectItem().deserialize(item)).sort();

        });
    }

    searchStates() {
        this.dropdownListStates = [];
        this.empresaService.getStates().subscribe((data: any[]) => {

            this.dropdownListStates = 
            Object.assign([], data).map(item => new SelectItem().deserialize(item));

        });
    }

    onAddRede() {
        let item = new SelectItem();
        item.id = "";
        item.itemName = this.filter_rede.name;
        item.code = null;

        this.selectedItemRede = []; 
        this.selectedItemRede.push(item);
        this.dropdownListRede.push(item);
        this.empresa.rede = new RedeEmpresa().convert(item);

        this.filter_rede.name = '';
        this.filter_rede.page = 0;
        this.fetchMoreRede({ end: 0, start: 1}); 
        this.selRedeEmp.closeDropdown();
    }

    save(){
        this.spinner.show();

        let msg: Toast = {
            type: 'warning',
            title: 'Verifique!',
            body: '',
        };

        if(StringUtils.isNullOrEmpty(this.empresa.nomeFantasia)){
            msg.body = 'Informe uma fantasia válida.'
            this.toasterService.pop(msg);
            return false
        }

        if(StringUtils.isNullOrEmpty(this.empresa.nomeRazaoSocial)){
            msg.body = 'Informe uma razão social válida.'
            this.toasterService.pop(msg);
            return false
        }

        if(StringUtils.isNullOrEmpty(this.empresa.cnpj)){
            msg.body = 'Informe um cnpj válido.'
            this.toasterService.pop(msg);
            return false
        }

        if(StringUtils.isNullOrEmpty(this.empresa.vencimentoContrato)){
            msg.body = 'Informe uma data de vencimento válida.'
            this.toasterService.pop(msg);
            return false
        }

        if(StringUtils.isNull(this.empresa.rede) || StringUtils.isNullOrEmpty(this.empresa.rede.nome)){
            msg.body = 'Informe uma rede-empresa válida.'
            this.toasterService.pop(msg);
            return false
        }

        if(StringUtils.isNull(this.empresa.plano)){
            msg.body = 'Informe um serviço válido.'
            this.toasterService.pop(msg);
            return false
        }

        if(StringUtils.isNull(this.empresa.status)){
            msg.body = 'Informe um status válido.'
            this.toasterService.pop(msg);
            return false
        }

        this.spinner.show();
        
        this.empresaService.save(this.empresa).subscribe((data: any) => {
            this.spinner.hide();
            let msg: Toast = {
                type: 'success',
                title: 'Salvo com sucesso'
            };
            this.toasterService.pop(msg);
            this.router.navigate(['/empresa']);
        }, (response: any) => {
            this.spinner.hide();
            let msg: Toast = {
                type: 'error',
                title: 'Erro ao Salvar',
                body: response.error.message
            };
            this.toasterService.pop(msg);
        });
    }

    load(id: string){
        this.spinner.show();
        this.empresaService.getById(id).subscribe((data: any) => {
            this.empresa = new Empresa().deserialize(data);
            this.selectedItemPlano.push(new SelectItem().fromPlano(this.empresa.plano));
            this.selectedItemRede.push(new SelectItem().fromRedeEmpresa(this.empresa.rede));
            this.selectedItemStatus.push(new SelectItem().fromStatus(this.empresa.status));
               
            if(!StringUtils.isNullOrEmpty(this.empresa.uf)){
                let state = this.dropdownListStates.find(x => x.code === this.empresa.uf); 
                if(!StringUtils.isNull(state))
                    this.selectedItemStates.push(state);
            }
            this.spinner.hide();
        }, (response: any) => {
            this.spinner.hide();
            let msg: Toast = {
                type: 'error',
                title: 'Erro ao Salvar',
                body: response.error.message
            };
            this.toasterService.pop(msg);
        });
    }

    onFileChange(evt: any) {
        let target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1)
            throw new Error('Cannot use multiple files');

        let reader: FileReader = new FileReader();
        reader.onload = (e: any) => {

            try {

                this.empresa.urlLogo = e.target.result;
                
                if(this.empresa.rede == null)
                    throw new Error("Informe uma rede de empresa válida!");

                if(this.empresa.anexo == null)  
                    this.empresa.anexo = new Anexo();
                
                let extension = target.files[0].name.split(".")[1].toLowerCase();
                let find = this.extensions.find(x => x === extension);
                if(StringUtils.isNull(find)) 
                    throw new Error("Arquivo com formato inválido!");
                
                this.empresa.anexo.file = this.empresa.urlLogo;
                this.empresa.anexo.nome = target.files[0].name;
                this.empresa.anexo.extensao = find;
                this.empresa.anexo.mimeType = target.files[0].type;

            } catch (e) {

                let msg: Toast = {
                    type: 'warning',
                    title: 'Verifique!',
                    body: e.message,
                };

                this.toasterService.pop(msg);

            }

        };
        reader.readAsDataURL(target.files[0]);
    };
}

