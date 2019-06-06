import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { AppService } from '../../app.service';
import { NoticiaService } from '../../service/noticia.service';
import { Noticia } from '../../model/noticia';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-noticia-lista',
  templateUrl: './noticia-lista.component.html',
  styleUrls: ['./noticia-lista.component.scss'],
  providers: [NoticiaService]
})
export class NoticiaListaComponent implements OnInit {
  filtro: string;
  selectFiltro: string;
  data: Noticia[];
  dataConv: LocalDataSource;

  settings: any;
  isRTL: boolean;

  constructor(private noticiaService: NoticiaService,
    private router: Router,
    private toasterService: ToasterService,
    private appService: AppService,
    private spinner: Ng4LoadingSpinnerService) {
    this.appService.pageTitle = 'Lista de Noticias';
    this.isRTL = appService.isRTL;
  }

  public ngOnInit(): any {
    this.getNoticias();
    this.settings = {
      hideSubHeader: true,
      columns: {
        titulo: {
          title: 'Titulo',
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
      noDataMessage: 'Nenhuma notícia encontrada',
    };
  }

  getNoticias() {
    this.spinner.show();
    this.noticiaService.getAll().subscribe((data) => {
      this.data =
        Object.assign([], data).map(item => {
          return new Noticia().deserialize(item);
        });

      this.dataConv =
        new LocalDataSource(
          this.data.map(noticia => {
            return noticia.transfer();
          })
        );

      this.spinner.hide();
    });
  };

  onSearch(value: string = '') {
    if (value == '') {
      this.dataConv.setFilter(null);
    } else {
      this.dataConv.setFilter([
        {
          field: 'titulo',
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

  newNoticia() {
    this.router.navigate(['/noticia/cadastro']);
  };

  editNoticia(event) {
    this.router.navigate(['/noticia/cadastro', event.data.id]);
  };

  deleteNoticia(event) {
    if (window.confirm('tem certeza que deseja excluir esta Notícia?')) {
      this.noticiaService.delete(event.data.id).subscribe((data) => {
        const msg: Toast = {
          type: 'success',
          title: 'Noticia excluída com sucesso'
        };
        this.toasterService.pop(msg);
        this.getNoticias();
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
