import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
import { AppService } from '../../app.service';
import { EventoService } from '../../service/evento.service';
import { CategoriaService } from '../../service/categoria.service';
import { StatusService } from '../../service/status.service';
import { ToasterService, Toast } from 'angular2-toaster';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { MapperUtils } from '../../utils/mapper-utils';
import { StringUtils } from '../../utils/string.utils';

import { Evento } from '../../model/evento';
import { EventoTag } from '../../model/evento-tag';
import { EventoFilter } from '../../model/evento-filter';
import { Categoria } from '../../model/categoria';
import { Status } from '../../model/status';
import { Anexo } from '../../model/anexo';

import { SelectItem } from '../../model/select-item';

@Component({
    selector: 'app-evento-cadastro',
    templateUrl: './evento-cadastro.component.html',
    styleUrls: [
        '../../../vendor/libs/quill/typography.scss',
        '../../../vendor/libs/quill/editor.scss',
        '../../../vendor/libs/ngb-datepicker/ngb-datepicker.scss',
        './evento-cadastro.component.scss'],
    providers: [
      EventoService,
      CategoriaService,
      StatusService]
})
export class EventoCadastroComponent implements OnInit {
  @ViewChild('inputFile') inputFile;

  evento_id: string;
  title_evento: string;
  evento: Evento;
  extensions: string[];
  horaInicio: string;
  minutoInicio: string;
  horaFim: string;
  minutoFim: string;

  dataInicio: Date;
  dataFim: Date;

  dropdownListCategoria: SelectItem[];
  selectedItemCategoria: SelectItem[];

  dropdownListStatus: SelectItem[];
  selectedItemStatus: SelectItem[];

  selectedItemTag: EventoTag[];

  dropdownSettingsCategoria: any;
  dropdownSettingsStatus: any;

  horaL = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
  ];

  minutoL = [
    "00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"
  ];

  estadoL = [{
    "sigla": "AC",
    "nome": "Acre"
  },
  {
    "sigla": "AL",
    "nome": "Alagoas"
  },
  {
    "sigla": "AM",
    "nome": "Amazonas"
  },
  {
    "sigla": "AP",
    "nome": "Amapá"
  },
  {
    "sigla": "BA",
    "nome": "Bahia"
  },
  {
    "sigla": "CE",
    "nome": "Ceará"
  },
  {
    "sigla": "DF",
    "nome": "Distrito Federal"
  },
  {
    "sigla": "ES",
    "nome": "Espírito Santo"
  },
  {
    "sigla": "GO",
    "nome": "Goiás"
  },
  {
    "sigla": "MA",
    "nome": "Maranhão"
  },
  {
    "sigla": "MG",
    "nome": "Minas Gerais"
  },
  {
    "sigla": "MS",
    "nome": "Mato Grosso do Sul"
  },
  {
    "sigla": "MT",
    "nome": "Mato Grosso"
  },
  {
    "sigla": "PA",
    "nome": "Pará"
  },
  {
    "sigla": "PB",
    "nome": "Paraíba"
  },
  {
    "sigla": "PE",
    "nome": "Pernambuco"
  },
  {
    "sigla": "PI",
    "nome": "Piauí"
  },
  {
    "sigla": "PR",
    "nome": "Paraná"
  },
  {
    "sigla": "RJ",
    "nome": "Rio de Janeiro"
  },
  {
    "sigla": "RN",
    "nome": "Rio Grande do Norte"
  },
  {
    "sigla": "RO",
    "nome": "Rondônia"
  },
  {
    "sigla": "RR",
    "nome": "Roraima"
  },
  {
    "sigla": "RS",
    "nome": "Rio Grande do Sul"
  },
  {
    "sigla": "SC",
    "nome": "Santa Catarina"
  },
  {
    "sigla": "SE",
    "nome": "Sergipe"
  },
  {
    "sigla": "SP",
    "nome": "São Paulo"
  },
  {
    "sigla": "TO",
    "nome": "Tocantins"
  }];

  isRTL: boolean;

  constructor(private appService: AppService,
              private eventoService: EventoService,
              private categoriaService: CategoriaService,
              private statusService: StatusService,
              private toasterService: ToasterService,
              private spinner: Ng4LoadingSpinnerService,
              private router: Router,
              private route: ActivatedRoute) {
    this.evento = new Evento();
    this.evento.tags = [];
    this.evento.urlLogo = '';

    this.extensions = ["gif", "png", "jpeg", "jpg", "bmp", "webp"];

    this.evento.isFavorito = true;
    this.evento.ativo = true;

    this.dropdownSettingsCategoria = MapperUtils.getDropdownSettingsSingleDefault();
    this.dropdownSettingsStatus = MapperUtils.getDropdownSettingsSingleDefault();

    this.dropdownSettingsCategoria.enableFilterSelectAll = false;
    this.dropdownSettingsStatus.enableFilterSelectAll = false;

    this.selectedItemCategoria = [];
    this.selectedItemStatus = [];
    this.selectedItemTag = [];

    this.isRTL = this.appService.isRTL;
  }

  public ngOnInit(): any {
    this.evento_id = this.route.snapshot.paramMap.get('id');
    if (StringUtils.isNullOrEmpty(this.evento_id)) {
      this.title_evento = 'Novo evento';
      this.appService.pageTitle = 'Adicionar Evento';
    } else {
      this.title_evento = 'Editar evento #' + this.evento_id;
      this.appService.pageTitle = 'Editar Evento';
    }

    this.searchStatus();
    this.searchCategoria();
    this.initControls();

    if (!StringUtils.isNullOrEmpty(this.evento_id))
      this.load(this.evento_id);
  }

  save() {
    let msg: Toast = {
      type: 'warning',
      title: 'Verifique!',
      body: '',
    };

    if (StringUtils.isNullOrEmpty(this.evento.nome)) {
      msg.body = 'Informe um nome válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.inicio)) {
      msg.body = 'Informe um início válido.';
      this.toasterService.pop(msg);
      return false;
    }

    this.dataInicio = new Date(
      parseInt(this.evento.inicio['year']),
      parseInt(this.evento.inicio['month']) - 1,
      parseInt(this.evento.inicio['day']),
      parseInt(this.horaInicio) - 3,
      parseInt(this.minutoInicio),
      0);

    if (this.evento.fim != undefined && this.evento.fim != null) {
      this.dataFim = new Date(
        parseInt(this.evento.fim['year']),
        parseInt(this.evento.fim['month']) - 1,
        parseInt(this.evento.fim['day']),
        parseInt(this.horaFim) - 3,
        parseInt(this.minutoFim),
        0);

      if (this.dataInicio > this.dataFim) {
        msg.body = 'A data fim deve ser superior a data início.';
        this.toasterService.pop(msg);
        return false;
      }
    }

    if (StringUtils.isNullOrEmpty(this.evento.preco)) {
      msg.body = 'Informe um preço válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.categoria)) {
      msg.body = 'Informe uma categoria válida.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.descricao)) {
      msg.body = 'Informe uma descrição válida.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNull(this.evento.status)) {
      msg.body = 'Informe um status válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.logradouro)) {
      msg.body = 'Informe um logradouro válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.cep)) {
      msg.body = 'Informe um cep válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.tipo)) {
      msg.body = 'Informe um tipo válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.bairro)) {
      msg.body = 'Informe um bairro válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.cidade)) {
      msg.body = 'Informe uma cidade válida.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.evento.uf)) {
      msg.body = 'Informe uma uf válida.';
      this.toasterService.pop(msg);
      return false;
    }

    this.evento.inicio = new Date(
      parseInt(this.evento.inicio['year']),
      parseInt(this.evento.inicio['month']) - 1,
      parseInt(this.evento.inicio['day']),
      parseInt(this.horaInicio) - 3,
      parseInt(this.minutoInicio),
      0);

    if (this.evento.fim != undefined && this.evento.fim != null) {
      this.evento.fim = new Date(
        parseInt(this.evento.fim['year']),
        parseInt(this.evento.fim['month']) - 1,
        parseInt(this.evento.fim['day']),
        parseInt(this.horaFim) - 3,
        parseInt(this.minutoFim),
        0);
    }

    this.spinner.show();
    this.eventoService.save(this.evento).subscribe((data: any) => {
      this.spinner.hide();
      let msg: Toast = {
        type: 'success',
        title: 'Salvo com sucesso'
      };
      this.toasterService.pop(msg);
      this.router.navigate(['/evento']);
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

  load(id: string) {
    this.spinner.show();
    this.eventoService.getById(id).subscribe((data: any) => {
      this.evento = new Evento().deserialize(data);

      this.selectedItemStatus.push(new SelectItem().fromStatus(this.evento.status));
      this.selectedItemCategoria.push(new SelectItem().fromCategoria(this.evento.categoria));

      var dataInicio = this.evento.inicio.toString().split('T')[0];
      var horarioInicio = this.evento.inicio.toString().split('T')[1];

      this.evento.inicio = new Date();
      this.evento.inicio['year'] = parseInt(dataInicio.split('-')[0]);
      this.evento.inicio['month'] = parseInt(dataInicio.split('-')[1]);
      this.evento.inicio['day'] = parseInt(dataInicio.split('-')[2]);

      this.horaInicio = horarioInicio.split(':')[0];
      this.minutoInicio = horarioInicio.split(':')[1];

      if (this.evento.fim != undefined && this.evento.fim != null) {
        var dataFim = this.evento.fim.toString().split('T')[0];
        var horarioFim = this.evento.fim.toString().split('T')[1];

        this.evento.fim = new Date();

        this.evento.fim['year'] = parseInt(dataFim.split('-')[0]);
        this.evento.fim['month'] = parseInt(dataFim.split('-')[1]);
        this.evento.fim['day'] = parseInt(dataFim.split('-')[2]);

        this.horaFim = horarioFim.split(':')[0];
        this.minutoFim = horarioFim.split(':')[1];
      }

      for (var i = 0; i < this.evento.tags.length; i++) {
        this.selectedItemTag.push(new EventoTag().convertFrom(this.evento.tags[i]));
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

  onClickFavorito() {
    this.evento.isFavorito = !this.evento.isFavorito;
  }

  getBackgroundImage() {
    return this.evento.anexo == null ? '' : this.evento.anexo.nome + '.' + this.evento.anexo.extensao;
  }

  searchStatus() {
    this.dropdownListStatus = [];
    this.statusService.getToSelectEvento().subscribe((data: any[]) => {

      this.dropdownListStatus =
        Object.assign([], data).map(item => new SelectItem().deserialize(item));

    });
  }

  searchCategoria() {
    this.dropdownListCategoria = [];
    this.categoriaService.getToSelectBeneficio().subscribe((data: any[]) => {

      this.dropdownListCategoria =
        Object.assign([], data).map(item => new SelectItem().deserialize(item));

    });
  }

  initControls() {
    this.horaInicio = '00';
    this.minutoInicio = '00';
    this.horaFim = '00';
    this.minutoFim = '00';
  }

  onItemSelectStatus(item: any) {
    let status = (new SelectItem().deserialize(item));
    this.evento.status = new Status().convert(status);
    this.selectedItemStatus = [];
    this.selectedItemStatus.push(status);
  }

  onItemSelectCategoria(item: any) {
    let categoria = (new SelectItem().deserialize(item));
    this.evento.categoria = new Categoria().convert(categoria);
    this.selectedItemCategoria = [];
    this.selectedItemCategoria.push(categoria);

    
  }

  onItemCreateTag(item: any) {
    let tag = (new EventoTag().deserialize(item));
    this.evento.tags.push(new EventoTag().convertTo(tag));
    this.selectedItemTag.push(tag);
  }

  onItemRemoveTag(item: any) {
    let tag = (new EventoTag().deserialize(item));

    for (var i = 0; i < this.evento.tags.length; i++) {
      if (this.evento.tags[i] === tag) {
        this.evento.tags.splice(i, 1);
      }
    }
  }

  onFileChange(evt: any) {
    let target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');

    let reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      try {
        this.evento.urlLogo = e.target.result;

        if (this.evento.anexo == null)
          this.evento.anexo = new Anexo();

        let extension = target.files[0].name.split(".")[1].toLowerCase();
        let find = this.extensions.find(x => x === extension);
        if (StringUtils.isNull(find))
          throw new Error("Arquivo com formato inválido!");

        this.evento.anexo.file = this.evento.urlLogo;
        this.evento.anexo.nome = target.files[0].name;
        this.evento.anexo.extensao = find;
        this.evento.anexo.mimeType = target.files[0].type;

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
