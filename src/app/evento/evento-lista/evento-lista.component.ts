import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { EventoService } from '../../service/evento.service';
import { StatusService } from '../../service/status.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LocalDataSource } from 'ng2-smart-table';
import { PagedList } from '../../model/paged-list';
import { SelectItem } from '../../model/select-item';
import { PaginateConfig } from '../../model/paginate-config';
import { Evento } from '../../model/evento';
import { EventoTag } from '../../model/evento-tag';
import { EventoFilter } from '../../model/evento-filter';
import { Status } from '../../model/status';
import * as numeral from 'numeral';

@Component({
    selector: 'app-evento-lista',
    templateUrl: './evento-lista.component.html',
    styleUrls: ['./evento-lista.component.scss'],
    providers: [EventoService, StatusService]
})
export class EventoListaComponent implements OnInit {
    filters: EventoFilter;
    config: PaginateConfig;
    data: Evento[];
    dataConv: LocalDataSource;

    dropdownListStatus: SelectItem[];

    constructor(private appService: AppService,
                private eventoService: EventoService,
                private statusService: StatusService,
                private router: Router,
                private toasterService: ToasterService,
                private spinner: Ng4LoadingSpinnerService) {
        this.appService.pageTitle = 'Eventos';

        this.config = new PaginateConfig();
        this.config.currentPage = 1;
        this.config.itemsPerPage = 6;
        this.config.totalItems = 6;
        this.config.totalPage = 1;
    }

    public ngOnInit(): any {
      this.getStatus();
    }

    uiStarClass(i, rating) {
        if (rating > (i - 1) && rating < i) { return 'half-filled'; }
        if (rating >= i) { return 'filled'; }
        return '';
    }

    formatPrice(p) {
        return 'R' + numeral(p).format('$0,0.00');
    }

  getStatus() {
    this.dropdownListStatus = [];
    this.statusService.getToSelectEvento().subscribe((data: any[]) => {

      this.dropdownListStatus =
        Object.assign([], data).map(item => {
          let status = new SelectItem().deserialize(item);
          status.code = 'nav-link text-muted';
          return status;
        });

      this.dropdownListStatus[0].code = 'nav-link text-dark font-weight-bold pl-0';
      this.getEventos();
    });
  }

  firstCharacters(texto: string, quantidade: number) {
    return texto.length >= quantidade ? texto.substring(0, quantidade) : texto;
  }

  stripImages(descricao: string) {
    while (descricao.indexOf('<img ') > -1) {
      let startIndex = descricao.indexOf('<img ');
      let endIndex = descricao.substring(startIndex).indexOf('">');
      let imageTag = descricao.substring(startIndex, endIndex + startIndex + 2);

      descricao = descricao.replace(imageTag, '');
    }

    return descricao;
  }

  defineNewFilter() {
    let result = new EventoFilter();

    result.decrescente = true;
    result.page = 1;
    result.page_size = 6;
    result.order = "Guid";
    result.status = new Status();
    result.status.guid = this.dropdownListStatus[0].id;

    return result;
    console.log(result);
  }

  setFilter(item: SelectItem) {
    this.dropdownListStatus.forEach(x => x.code = 'nav-link text-muted');
    item.code = 'nav-link text-dark font-weight-bold pl-0';

    this.filters = this.defineNewFilter();
    this.filters.status.guid = item.id;
    this.getPage(1);
  }

  getEventos() {
    this.filters = this.defineNewFilter();
    this.getPage(1);
  }

  getPage(page: number) {
    console.log(this.filters);
    this.filters.page = page;
    this.spinner.show();
    this.eventoService.getWithFilters(this.filters).subscribe((data: any) => {
      let result = new PagedList().deserialize(data);
      this.config.convert(result);
      this.data = result.items.map(item => {
        return new Evento().deserialize(item);
      });

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

  // getDuracao(item: Evento) {
  //   let dataInicio = new Date(item.inicio);
  //   let dataFim = new Date(item.fim);

  //   return dataInicio.getDay().toString().padStart(2, '0') + '/' + dataInicio.getMonth().toString().padStart(2, '0') + ' até ' +
  //     dataFim.getDay().toString().padStart(2, '0') + '/' + dataFim.getMonth().toString().padStart(2, '0');
  // }

  newEvento() {
    this.router.navigate(['/evento/cadastro']);
  };

  editEvento(event) {
    this.router.navigate(['/evento/cadastro', event.guid]);
  };

  deleteEvento(event) {
    
    if (window.confirm('tem certeza que deseja excluir este Evento?')) {
      console.log("GUID (DELETE) :", event.guid);
      this.eventoService.delete(event.guid).subscribe((data) => {
        const msg: Toast = {
          type: 'success',
          title: 'Evento excluído com sucesso'
        };
        this.toasterService.pop(msg);
        this.getEventos();
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
