import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';

import { MapperUtils } from '../../utils/mapper-utils';
import { StringUtils } from '../../utils/string.utils';
import { AppService } from '../../app.service';
import { NoticiaService } from '../../service/noticia.service';
import { CategoriaService } from '../../service/categoria.service';
import { StatusService } from '../../service/status.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { SelectItem } from '../../model/select-item';
import { Noticia } from '../../model/noticia';
import { NoticiaTag } from '../../model/noticia-tag';
import { Categoria } from '../../model/categoria';
import { Status } from '../../model/status';
import { Anexo } from '../../model/anexo';

@Component({
  selector: 'app-noticia-cadastro',
  templateUrl: './noticia-cadastro.component.html',
  styleUrls: [
    '../../../vendor/libs/quill/typography.scss',
    '../../../vendor/libs/quill/editor.scss',
    './noticia-cadastro.component.scss'
  ],
  providers: [
    NoticiaService,
    CategoriaService,
    StatusService,
  ]
})

export class NoticiaCadastroComponent implements OnInit {
  @ViewChild('inputFile') inputFile;

  noticia_id: string;
  title_noticia: string;
  noticia: Noticia;
  extensions: string[];

  dropdownListCategoria: SelectItem[];
  selectedItemCategoria: SelectItem[];

  dropdownListStatus: SelectItem[];
  selectedItemStatus: SelectItem[];

  selectedItemTag: NoticiaTag[];

  dropdownSettingsSingleCustom: any;
  dropdownSettingsCategoria: any;
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

  constructor(private noticiaService: NoticiaService,
    private categoriaService: CategoriaService,
    private statusService: StatusService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private appService: AppService,
    private spinner: Ng4LoadingSpinnerService) {
    this.noticia = new Noticia();
    this.noticia.tags = [];
    this.noticia.urlLogo = undefined;

    this.extensions = ["gif", "png", "jpeg", "jpg", "bmp", "webp"];

    this.noticia.isFavorito = true;
    this.noticia.ativo = true;

    this.dropdownSettingsCategoria = MapperUtils.getDropdownSettingsSingleDefault();
    this.dropdownSettingsStatus = MapperUtils.getDropdownSettingsSingleDefault();
    this.dropdownSettingsSingleCustom = MapperUtils.getDropdownSettingsSingleCustom();

    this.dropdownSettingsStatus.maxHeight = 130;
    this.dropdownSettingsStatus.enableFilterSelectAll = false;
    this.dropdownSettingsCategoria.enableFilterSelectAll = false;
    this.dropdownSettingsSingleCustom.enableFilterSelectAll = false;

    this.selectedItemCategoria = [];
    this.selectedItemStatus = [];
    this.selectedItemTag = [];
  }

  public ngOnInit(): any {
    this.noticia_id = this.route.snapshot.paramMap.get('id');
    if (StringUtils.isNullOrEmpty(this.noticia_id)) {
      this.title_noticia = 'Nova notícia';
      this.appService.pageTitle = 'Adicionar notícia';
    } else {
      this.title_noticia = 'Editar notícia #' + this.noticia_id;
      this.appService.pageTitle = 'Editar notícia';
    }

    this.searchStatus();
    this.searchCategoria();

    if (!StringUtils.isNullOrEmpty(this.noticia_id))
      this.load(this.noticia_id);
  }

  onItemSelectStatus(item: any) {
    let status = (new SelectItem().deserialize(item));
    this.noticia.status = new Status().convert(status);
    this.selectedItemStatus = [];
    this.selectedItemStatus.push(status);
  }

  onItemSelectCategoria(item: any) {
    let categoria = (new SelectItem().deserialize(item));
    this.noticia.categoria = new Categoria().convert(categoria);
    this.selectedItemCategoria = [];
    this.selectedItemCategoria.push(categoria);
  }

  searchStatus() {
    this.dropdownListStatus = [];
    this.statusService.getToSelectNoticia().subscribe((data: any[]) => {

      this.dropdownListStatus =
        Object.assign([], data).map(item => new SelectItem().deserialize(item));

    });
  }

  searchCategoria() {
    this.dropdownListCategoria = [];
    this.categoriaService.getToSelectNoticia().subscribe((data: any[]) => {

      this.dropdownListCategoria =
        Object.assign([], data).map(item => new SelectItem().deserialize(item));

    });
  }

  save() {
    let msg: Toast = {
      type: 'warning',
      title: 'Verifique!',
      body: '',
    };

    if (StringUtils.isNullOrEmpty(this.noticia.titulo)) {
      msg.body = 'Informe um título válido.'
      this.toasterService.pop(msg);
      return false
    }

    if (StringUtils.isNull(this.noticia.categoria)) {
      msg.body = 'Informe uma categoria válida.'
      this.toasterService.pop(msg);
      return false
    }

    if (StringUtils.isNull(this.noticia.status)) {
      msg.body = 'Informe um status válido.'
      this.toasterService.pop(msg);
      return false
    }

    if (StringUtils.isNullOrEmpty(this.noticia.resumo)) {
      msg.body = 'Informe um resumo válido.'
      this.toasterService.pop(msg);
      return false
    }

    if (StringUtils.isNullOrEmpty(this.noticia.descricaoNoticia)) {
      msg.body = 'Informe uma descrição válida.'
      this.toasterService.pop(msg);
      return false
    }

    if (StringUtils.isNullOrEmpty(this.noticia.anexo)) {
      msg.body = 'Informe uma imagem válida.'
      this.toasterService.pop(msg);
      return false
    }

    this.spinner.show();
    this.noticiaService.save(this.noticia).subscribe((data: any) => {
      this.spinner.hide();
      let msg: Toast = {
        type: 'success',
        title: 'Salvo com sucesso'
      };
      this.toasterService.pop(msg);
      this.router.navigate(['/noticia']);
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
    this.noticiaService.getById(id).subscribe((data: any) => {
      this.noticia = new Noticia().deserialize(data);
      this.selectedItemCategoria.push(new SelectItem().fromCategoria(this.noticia.categoria));
      this.selectedItemStatus.push(new SelectItem().fromStatus(this.noticia.status));

      for (var i = 0; i < this.noticia.tags.length; i++) {
        this.selectedItemTag.push(new NoticiaTag().convertFrom(this.noticia.tags[i]));
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
    this.noticia.isFavorito = !this.noticia.isFavorito;
  }

  onItemCreateTag(item: any) {
    let tag = (new NoticiaTag().deserialize(item));
    this.noticia.tags.push(new NoticiaTag().convertTo(tag));
    this.selectedItemTag.push(tag);
  }

  onItemRemoveTag(item: any) {
    let tag = (new NoticiaTag().deserialize(item));

    for (var i = 0; i < this.noticia.tags.length; i++) {
      if (this.noticia.tags[i] === tag) {
        this.noticia.tags.splice(i, 1);
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

        this.noticia.urlLogo = e.target.result;

        if (this.noticia.anexo == null)
          this.noticia.anexo = new Anexo();

        let extension = target.files[0].name.split(".")[1].toLowerCase();
        let find = this.extensions.find(x => x === extension);
        if (StringUtils.isNull(find))
          throw new Error("Arquivo com formato inválido!");

        this.noticia.anexo.file = this.noticia.urlLogo;
        this.noticia.anexo.nome = target.files[0].name;
        this.noticia.anexo.extensao = find;
        this.noticia.anexo.mimeType = target.files[0].type;

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
