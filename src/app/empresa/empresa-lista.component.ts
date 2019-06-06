import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { AppService } from '../app.service';
import { EmpresaService } from '../service/empresa.service';
import { Empresa } from '../model/empresa';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
    selector: 'app-empresa-lista',
    templateUrl: '../empresa/empresa-lista.component.html',
    styleUrls: [ '../empresa/empresa.component.scss' ],
    providers:[ EmpresaService ]
})
export class EmpresaListaComponent implements OnInit {
    filtro: string;
    selectFiltro: string;
    data: Empresa[];
    dataConv: LocalDataSource; 

    settings: any;
    isRTL: boolean;

    constructor(private empresaService: EmpresaService, 
                private router: Router, 
                private toasterService: ToasterService, 
                private appService: AppService, 
                private spinner: Ng4LoadingSpinnerService) {
        this.appService.pageTitle = 'Lista de Empresas';
        this.isRTL = appService.isRTL;
    }
    
    public ngOnInit() : any {
        this.getEmpresas();
        this.settings = {
            hideSubHeader: true,
            columns: {
                rede_nome:{
                    title: 'Rede',
                    filter: false,
                    class: 'text-nowrap cursor-pointer',
                    editable: false,
                },
                nome_fantasia: {
                    title: 'Fantasia',
                    filter: false,
                    class: 'text-nowrap cursor-pointer',
                    editable: false,
                },
                cnpj: {
                    title: 'CNPJ',
                    filter: false,
                    class: 'text-nowrap cursor-pointer',
                    editable: false,
                },
                telefone: {
                    title: 'Telefone',
                    filter: false,
                    class: 'text-nowrap cursor-pointer',
                    editable: false,
                },
                cadastro: {
                    title: 'Criado em',
                    filter: false,
                    class: 'text-nowrap cursor-pointer',
                    editable: false,
                },
                status_nome: {
                    title: 'Status',
                    filter: false,
                    class: 'text-nowrap cursor-pointer',
                    editable: false,
                }
            },
            mode: 'external',
            actions:{
                columnTitle: '',
                position: 'right'
            },
            edit: {
                editButtonContent: "<a href='#' class='btn btn-default btn-xs icon-btn md-btn-flat' ngbTooltip='Edit'><i class='action-button ion ion-md-create'></i>",
            },
            delete: {
                deleteButtonContent: "<a href='#' class='btn btn-default btn-xs icon-btn md-btn-flat' ngbTooltip='Remove'><i class='action-button ion ion-md-close'></i>",
            },
            attr: {
                class: 'table table-striped table-bordered card-table'
            },
            pager: {
                display: true,
                perPage: 10,
            },
            noDataMessage: 'Nenhuma empresa encontrada',
        };
    }

    getEmpresas(){
        this.spinner.show();
        this.empresaService.getAll().subscribe((data) => {
            this.data = 
            Object.assign([], data).map(item => {
                return new Empresa().deserialize(item);
            });

            this.dataConv =
            new LocalDataSource(
                this.data.map(empresa => {
                    return empresa.transfer();
                })
            );

            this.dataConv.setSort([
                { field: 'rede_nome', direction: 'asc' }, 
                { field: 'nome_fantasia', direction: 'asc' }, 
            ]);

            this.spinner.hide();
        });
    };

    onSearch(value: string = ''){
        if(value == ''){
            this.dataConv.setFilter(null);
        } else{
            this.dataConv.setFilter([
                {
                    field: 'rede_nome',
                    search: value
                },
                {
                    field: 'nome_fantasia',
                    search: value
                },
                {
                    field: 'cnpj',
                    search: value
                },
                {    
                    field: 'telefone',
                    search: value
                },
                {    
                    field: 'cadastro',
                    search: value
                },
                {    
                    field: 'status_nome',
                    search: value
                },
            ], false);
        }
    };

    newEmpresa() {
        this.router.navigate(['/empresa/cadastro']);
    };

    editEmpresa(event) {
        this.router.navigate(['/empresa/cadastro',  event.data.id ]);
    };

    deleteEmpresa(event) {
        if (window.confirm('tem certeza que deseja excluir esta Empresa?')) {
            this.empresaService.delete(event.data.id).subscribe((data) => {
                const msg: Toast = {
                    type: 'success',
                    title: 'Empresa excluída com sucesso'
                };
                this.toasterService.pop(msg);
                this.getEmpresas();
            }, (response) => {
                const msg: Toast = {
                    type: 'error',
                    title: 'Erro ao excluir',
                    body: response.error.message,
                };
                this.toasterService.pop(msg);
            });
        }
    };
}
