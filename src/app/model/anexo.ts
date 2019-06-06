import { Deserializable } from './deserializable';
import { Base } from './base';
import { Usuario } from './usuario';

export class Anexo extends Base implements Deserializable {
    usuario: Usuario;
    nome: string;
    extensao: string;
    mimeType: string;
    file: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
