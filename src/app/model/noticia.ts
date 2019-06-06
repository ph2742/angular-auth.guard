import { Deserializable } from './deserializable';
import { DatePipe } from '@angular/common';
import { Base } from './base';
import { NoticiaTag } from './noticia-tag';
import { Categoria } from './categoria';
import { Status } from './status';
import { Anexo } from './anexo';
import { Usuario } from './usuario';

export class Noticia extends Base implements Deserializable {
    categoria: Categoria;
    status: Status;
    anexo: Anexo;
    usuario: Usuario;
    titulo: string;
    descricaoNoticia: string;
    tags: NoticiaTag[];
    videoCapa: string;
    isFavorito: boolean;
    urlLogo: string;
    resumo: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    transfer(){
        let datePipe = new DatePipe('pt-BR');
        return {
            titulo: this.titulo,
            cadastro: datePipe.transform(this.cadastro, 'short'),
            status_nome: this.status.nome,
            id: this.guid,
        };
    }
}
