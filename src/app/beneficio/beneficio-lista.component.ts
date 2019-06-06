import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { AppService } from '../app.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { BeneficioService } from '../service/beneficio.service';
import { BeneficioTipoService } from '../service/beneficio-tipo.service';
import { CategoriaService } from '../service/categoria.service';
import { StatusService } from '../service/status.service';

import { PaginateConfig } from '../model/paginate-config';
import { BeneficioFilter } from '../model/beneficio-filter';
import { Beneficio } from '../model/beneficio';
import { Status } from '../model/status';
import { PagedList } from '../model/paged-list';
import { SelectItem } from '../model/select-item';

@Component({
    selector: 'app-beneficio-lista',
    templateUrl: './beneficio-lista.component.html',
    styleUrls: ['./beneficio.component.scss']
})
export class BeneficioListaComponent {
    filters: BeneficioFilter;
    config: PaginateConfig;
    data: Beneficio[];
    dataConv: LocalDataSource;

    dropdownListStatus: SelectItem[];
    selectedItemStatus: SelectItem[];

    settings: any;

    isRTL: boolean;

    constructor(private beneficioService: BeneficioService,
                private statusService: StatusService,
                private router: Router,
                private toasterService: ToasterService,
                private spinner: Ng4LoadingSpinnerService,
                private appService: AppService) {
        this.appService.pageTitle = 'Lista de Benefícios';
        this.isRTL = this.appService.isRTL;

        this.config = new PaginateConfig();
        this.config.currentPage = 1;
        this.config.itemsPerPage = 6;
        this.config.totalItems = 6;
        this.config.totalPage = 1;
    }

    public ngOnInit() : any {
      console.log("Usuario", this.beneficioService.obterUsuario());
        this.getStatus();
        this.settings = {
          hideSubHeader: true,
          columns: {
            nome: {
              title: 'Nome',
              filter: false,
              class: 'text-nowrap cursor-pointer',
              editable: false,
            },
            descricao: {
              title: 'Descrição',
              filter: false,
              class: 'text-nowrap cursor-pointer',
              editable: false,
            },
            categoria_nome: {
              title: 'Categoria',
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
          actions: {
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
          noDataMessage: 'Nenhum benefício encontrado',
        };
    }

    getStatus() {
        this.dropdownListStatus = [];
        this.statusService.getToSelectBeneficio().subscribe((data: any[]) => {

            this.dropdownListStatus =
            Object.assign([], data).map(item => {
                let status = new SelectItem().deserialize(item);
                status.code = 'nav-link text-muted';
                return status;
            });

            this.dropdownListStatus[0].code = 'nav-link text-dark font-weight-bold pl-0';
            this.getBeneficios();
        });
    }

    defineNewFilter(){
        let result = new BeneficioFilter();

        result.decrescente = true;
        result.page = 1;
        result.page_size = 6;
        result.order = "Guid";
        result.status = new Status();
        result.status.guid = this.dropdownListStatus[0].id;

        return result;
    }

    setFilter(item: SelectItem){
        this.dropdownListStatus.forEach(x => x.code = 'nav-link text-muted');
        item.code = 'nav-link text-dark font-weight-bold pl-0';

        this.filters = this.defineNewFilter();
        this.filters.status.guid = item.id;
        this.getPage(1);
    }

    getBeneficios(){
        this.filters = this.defineNewFilter();
        this.getPage(1);
    }

    getPage(page: number){
        this.filters.page = page;
        this.spinner.show();
        this.beneficioService.getWithFilters(this.filters).subscribe((data: any) => {
            let result = new PagedList().deserialize(data);
            this.config.convert(result);
            this.data = result.items.map(item => {
                return new Beneficio().deserialize(item);
            });

            this.dataConv =
            new LocalDataSource(
                this.data.map(beneficio => {
                    return beneficio.transfer();
                })
            );

            this.spinner.hide();
        }, (response: any) => {
            console.log(response);
            this.spinner.hide();
            let msg: Toast = {
                type: 'error',
                title: 'Erro ao listar',
                body: response.error.message
            };
            this.toasterService.pop(msg);
        });
    };

    onSearch(value: string = '') {
      if (value == '') {
        this.dataConv.setFilter(null);
      } else {
        this.dataConv.setFilter([
          // {
          //   field: 'nome',
          //   search: value
          // },
          {
            field: 'descricao',
            search: value
          }
        ], false);
      }
      console.log(this.dataConv);
    };

  newBeneficio() {
    this.router.navigate(['/beneficio/cadastro']);
  };

  editBeneficio(event) {
      console.log("editBeneficio", event)
    this.router.navigate(['/beneficio/cadastro', event.guid]);
  };

  deleteBeneficio(event) {
    if (window.confirm('tem certeza que deseja excluir este Beneficio?')) {
      this.beneficioService.delete(event.guid).subscribe((data) => {
        const msg: Toast = {
          type: 'success',
          title: 'Benefício excluído com sucesso'
        };
        this.toasterService.pop(msg);
        this.getBeneficios();
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

  stripImages(descricao: string) {
    while (descricao.indexOf('<img ') > -1) {
      let startIndex = descricao.indexOf('<img ');
      let endIndex = descricao.substring(startIndex).indexOf('">');
      let imageTag = descricao.substring(startIndex, endIndex + startIndex + 2);

      descricao = descricao.replace(imageTag, '');
    }

    return descricao;
  }

  firstCharacters(texto: string, quantidade: number) {
    return texto.length >= quantidade ? texto.substring(0, quantidade) : texto;
  }
}
