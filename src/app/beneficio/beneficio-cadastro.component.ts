import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';

import { MapperUtils } from '../utils/mapper-utils';
import { StringUtils } from '../utils/string.utils';
import { AppService } from '../app.service';
import { BeneficioService } from '../service/beneficio.service';
import { BeneficioTipoService } from '../service/beneficio-tipo.service';
import { EmpresaService } from '../service/empresa.service';
import { CategoriaService } from '../service/categoria.service';
import { StatusService } from '../service/status.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { BeneficioFilter } from '../model/beneficio-filter';
import { BeneficioTipo } from '../model/beneficio-tipo';
import { SelectItem } from '../model/select-item';
import { Beneficio } from '../model/beneficio';
import { Empresa } from '../model/empresa';
import { Categoria } from '../model/categoria';
import { Status } from '../model/status';
import { Anexo } from '../model/anexo';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { BeneficioTag } from '../model/beneficio-tag';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-beneficio-cadastro',
  templateUrl: './beneficio-cadastro.component.html',
  styleUrls: [
    '../../vendor/libs/quill/typography.scss',
    '../../vendor/libs/quill/editor.scss',
    './beneficio.component.scss'
  ],
  providers: [
    BeneficioService,
    BeneficioTipoService,
    CategoriaService,
    StatusService,
  ]
})
export class BeneficioCadastroComponent implements OnInit {
  @ViewChild('inputFile') inputFile;

  beneficio_id: string;
  title_beneficio: string;
  beneficio: Beneficio;
  extensions: string[];
  horaInicio: string;
  minutoInicio: string;
  horaFim: string;
  minutoFim: string;

  dataInicio: Date;
  dataFim: Date;

  dropdownListEmpresa: SelectItem[];
  selectedItemEmpresa: SelectItem[];

  dropdownListCategoria: SelectItem[];
  selectedItemCategoria: SelectItem[];

  dropdownListStatus: SelectItem[];
  selectedItemStatus: SelectItem[];

  selectedItemTag: BeneficioTag[];

  dropdownSettingsEmpresa: any;
  dropdownSettingsCategoria: any;
  dropdownSettingsStatus: any;

  tipo: any = 1;

  tipoL = [{
    "id": 1,
    "nome": "Geração de Cupom"
  },
  {
    "id": 2,
    "nome": "Cupom Fixo"
  },
  {
    "id": 3,
    "nome": "Redirecionar para Site"
  }];

  tipoDescontoL = [{ value: "1", text: "Desconto em %" }, { value: "2", text: "Valor Fixo" }];

  publicoL = [{ value: "1", text: "Assinantes" }, { value: "2", text: "Não Assinantes" }, { value: "3", text: "Ambos" }];

  horaL = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
  ];

  minutoL = [
    "00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"
  ];

  isRTL: boolean;

  constructor(private beneficioService: BeneficioService,
    private empresaService: EmpresaService,
    private categoriaService: CategoriaService,
    private statusService: StatusService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private appService: AppService,
    private spinner: Ng4LoadingSpinnerService) {
    this.beneficio = new Beneficio();
    this.beneficio.tipo = new BeneficioTipo();
    this.beneficio.tipo.tipoBeneficio = "1";
    this.beneficio.tipo.tipoDesconto = "1";
    this.beneficio.tipo.publico = "1";
    this.beneficio.tags = [];
    this.beneficio.empresaL = [];
    this.beneficio.urlLogo = '';

    this.extensions = ["gif", "png", "jpeg", "jpg", "bmp", "webp"];

    this.beneficio.isFavorito = true;
    this.beneficio.ativo = true;
    this.beneficio.videoCapa = null;

    this.dropdownSettingsEmpresa = MapperUtils.getDropdownSettingsMultipleDefault();
    this.dropdownSettingsCategoria = MapperUtils.getDropdownSettingsSingleDefault();
    this.dropdownSettingsStatus = MapperUtils.getDropdownSettingsSingleDefault();

    this.dropdownSettingsEmpresa.enableFilterSelectAll = false;
    this.dropdownSettingsCategoria.enableFilterSelectAll = false;
    this.dropdownSettingsStatus.enableFilterSelectAll = false;

    this.selectedItemEmpresa = [];
    this.selectedItemCategoria = [];
    this.selectedItemStatus = [];
    this.selectedItemTag = [];

    this.isRTL = this.appService.isRTL;
  }

  public ngOnInit(): any {
    this.beneficio_id = this.route.snapshot.paramMap.get('id');
    if (StringUtils.isNullOrEmpty(this.beneficio_id)) {
      this.title_beneficio = 'Novo benefício';
      this.appService.pageTitle = 'Adicionar Benefício';
    } else {
      this.title_beneficio = 'Editar benefício #' + this.beneficio_id;
      this.appService.pageTitle = 'Editar Benefício';
    }

    this.searchStatus();
    this.searchCategoria();
    this.searchEmpresa();
    this.initControls();

    if (!StringUtils.isNullOrEmpty(this.beneficio_id))
      this.load(this.beneficio_id);
  }

  onItemSelectStatus(item: any) {
    let status = (new SelectItem().deserialize(item));
    this.beneficio.status = new Status().convert(status);
    this.selectedItemStatus = [];
    this.selectedItemStatus.push(status);
  }

  onItemSelectCategoria(item: any) {
    let categoria = (new SelectItem().deserialize(item));
    this.beneficio.categoria = new Categoria().convert(categoria);
    this.selectedItemCategoria = [];
    this.selectedItemCategoria.push(categoria);
  }

  onItemCreateTag(item: any) {
    let tag = (new BeneficioTag().deserialize(item));
    this.beneficio.tags.push(new BeneficioTag().convertTo(tag));
    this.selectedItemTag.push(tag);

    console.log("TAG : ", tag);
    console.log("ITEM : ", item);
  }

  // public validators = [this.validarFormatoTag];
  // public errorMessages = {
  //   'alerta': 'A Tag deve iniciar com uma letra maiúscula',
  // };
  
  // private validarFormatoTag(control: FormControl) {
  //   control = control.value.substring(0,1).toUpperCase().concat(control.value.substring(1));
    // console.log("CONTROL:", control);
    

    // var TAG_REGEXP1 = /^[A-Z][a-z]*$/g;
    // if (control.value != "" && (control.value.length <= 1 || !TAG_REGEXP1.test(control.value))) {
    //   return { "alerta": true };
    // }
    // return null;

  // }

  
  onItemRemoveTag(item: any) {
    let tag = (new BeneficioTag().deserialize(item));

    for (var g = 0; g < this.beneficio.tags.length; g++) {
      if (this.beneficio.tags[g] === tag) {
        this.beneficio.tags.splice(g, 1);
      }
    }
  }

  searchStatus() {
    this.dropdownListStatus = [];
    this.statusService.getToSelectBeneficio().subscribe((data: any[]) => {

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

  searchEmpresa() {
    this.dropdownListEmpresa = [];
    this.empresaService.getToSelect().subscribe((data: any[]) => {

      this.dropdownListEmpresa =
        Object.assign([], data).map(item => new SelectItem().deserialize(item));

    });
  }

  initControls() {
    this.horaInicio = '00';
    this.minutoInicio = '00';
    this.horaFim = '00';
    this.minutoFim = '00';
  }

  save() {
    let msg: Toast = {
      type: 'warning',
      title: 'Verifique!',
      body: '',
    };

    if (StringUtils.isNullOrEmpty(this.beneficio.nome)) {
      msg.body = 'Informe um nome válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.beneficio.inicio)) {
      msg.body = 'Informe um início válido.';
      this.toasterService.pop(msg);
      return false;
    }

    this.dataInicio = new Date(
      parseInt(this.beneficio.inicio['year']),
      parseInt(this.beneficio.inicio['month']) - 1,
      parseInt(this.beneficio.inicio['day']),
      parseInt(this.horaInicio) - 3,
      parseInt(this.minutoInicio),
      0);

    if (this.beneficio.fim != undefined && this.beneficio.fim != null) {
      this.dataFim = new Date(
        parseInt(this.beneficio.fim['year']),
        parseInt(this.beneficio.fim['month']) - 1,
        parseInt(this.beneficio.fim['day']),
        parseInt(this.horaFim) - 3,
        parseInt(this.minutoFim),
        0);

      if (this.dataInicio > this.dataFim) {
        msg.body = 'A data fim deve ser superior a data início.';
        this.toasterService.pop(msg);
        return false;
      }
    }

    if (StringUtils.isNullOrEmpty(this.beneficio.categoria)) {
      msg.body = 'Informe uma categoria válida.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.beneficio.descricao)) {
      msg.body = 'Informe uma descrição válida.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNull(this.beneficio.status)) {
      msg.body = 'Informe um status válido.';
      this.toasterService.pop(msg);
      return false;
    }

    // if (StringUtils.isNullOrEmpty(this.beneficio.tipo.ValorAntigo)) {
    //   msg.body = 'Informe um valor válido.';
    //   this.toasterService.pop(msg);
    //   return false;
    // }

    if (StringUtils.isNullOrEmpty(this.beneficio.tipo.valorDesconto)) {
      msg.body = 'Informe um valor válido.';
      this.toasterService.pop(msg);
      return false;
    }

    // if (StringUtils.isNullOrEmpty(this.beneficio.tipo.Porcentagem)) {
    //   msg.body = 'Informe um valor válido.';
    //   this.toasterService.pop(msg);
    //   return false;
    // }

    if (StringUtils.isNullOrEmpty(this.beneficio.tipo.quantidadeBeneficio)) {
      msg.body = 'Informe uma quantidade válida.';
      this.toasterService.pop(msg);
      return false;
    }

    if (StringUtils.isNullOrEmpty(this.beneficio.tipo.maximaUsuario)) {
      msg.body = 'Informe um limite por usuário válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (this.beneficio.tipo.maximaUsuario > this.beneficio.tipo.quantidadeBeneficio) {
      msg.body = 'Informe um limite por usuário válido.';
      this.toasterService.pop(msg);
      return false;
    }

    if (this.selectedItemEmpresa.length === 0) {
      msg.body = 'Informe uma empresa válida.';
      this.toasterService.pop(msg);
      return false;
    }

    this.beneficio.inicio = new Date(
      parseInt(this.beneficio.inicio['year']),
      parseInt(this.beneficio.inicio['month']) - 1,
      parseInt(this.beneficio.inicio['day']),
      parseInt(this.horaInicio) - 3,
      parseInt(this.minutoInicio),
      0);

    if (this.beneficio.fim != undefined && this.beneficio.fim != null) {
      this.beneficio.fim = new Date(
        parseInt(this.beneficio.fim['year']),
        parseInt(this.beneficio.fim['month']) - 1,
        parseInt(this.beneficio.fim['day']),
        parseInt(this.horaFim) - 3,
        parseInt(this.minutoFim),
        0);
    }

    this.beneficio.empresaL = [];
    for (var i = 0; i < this.selectedItemEmpresa.length; i++) {
      this.beneficio.empresaL.push(new Empresa().convert(this.selectedItemEmpresa[i]));
    }

    this.spinner.show();
    this.beneficioService.save(this.beneficio).subscribe((data: any) => {
      this.spinner.hide();
      let msg: Toast = {
        type: 'success',
        title: 'Salvo com sucesso'
      };
      this.toasterService.pop(msg);
      this.router.navigate(['/beneficio']);
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
    this.beneficioService.getById(id).subscribe((data: any) => {
      this.beneficio = new Beneficio().deserialize(data);

      this.selectedItemCategoria.push(new SelectItem().fromCategoria(this.beneficio.categoria));
      this.selectedItemStatus.push(new SelectItem().fromStatus(this.beneficio.status));

      var dataInicio = this.beneficio.inicio.toString().split('T')[0];
      var horarioInicio = this.beneficio.inicio.toString().split('T')[1];

      this.beneficio.inicio = new Date();
      this.beneficio.inicio['year'] = parseInt(dataInicio.split('-')[0]);
      this.beneficio.inicio['month'] = parseInt(dataInicio.split('-')[1]);
      this.beneficio.inicio['day'] = parseInt(dataInicio.split('-')[2]);

      this.horaInicio = horarioInicio.split(':')[0];
      this.minutoInicio = horarioInicio.split(':')[1];

      if (this.beneficio.fim != undefined && this.beneficio.fim != null) {
        var dataFim = this.beneficio.fim.toString().split('T')[0];
        var horarioFim = this.beneficio.fim.toString().split('T')[1];

        this.beneficio.fim = new Date();

        this.beneficio.fim['year'] = parseInt(dataFim.split('-')[0]);
        this.beneficio.fim['month'] = parseInt(dataFim.split('-')[1]);
        this.beneficio.fim['day'] = parseInt(dataFim.split('-')[2]);

        this.horaFim = horarioFim.split(':')[0];
        this.minutoFim = horarioFim.split(':')[1];
      }

      for (var i = 0; i < this.beneficio.tags.length; i++) {
        this.selectedItemTag.push(new BeneficioTag().convertFrom(this.beneficio.tags[i]));
      }

      for (var i = 0; i < this.beneficio.empresaL.length; i++) {
        this.selectedItemEmpresa.push(new SelectItem().fromEmpresa(this.beneficio.empresaL[i]));
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
    this.beneficio.isFavorito = !this.beneficio.isFavorito;
  }

  getBackgroundImage() {
    return this.beneficio.anexo == null ? '' : this.beneficio.anexo.nome;
  }

  padLeft(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) { s = '0' + s };
    return s;
  }

  onFileChange(evt: any) {
    let target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1)
      throw new Error('Cannot use multiple files');

    let reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      try {
        this.beneficio.urlLogo = e.target.result;

        if (this.beneficio.anexo == null)
          this.beneficio.anexo = new Anexo();

        let extension = target.files[0].name.split(".")[1].toLowerCase();
        let find = this.extensions.find(x => x === extension);
        if (StringUtils.isNull(find))
          throw new Error("Arquivo com formato inválido!");

        this.beneficio.anexo.file = this.beneficio.urlLogo;
        this.beneficio.anexo.nome = target.files[0].name;
        this.beneficio.anexo.extensao = find;
        this.beneficio.anexo.mimeType = target.files[0].type;

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
