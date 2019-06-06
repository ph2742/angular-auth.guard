import { Deserializable } from './deserializable';
import { Base } from './base';
import { Perfil } from './perfil';

export class Usuario extends Base implements Deserializable {
    perfil: Perfil;
    username: string;
    password: string;
    nome: string;
    email: string;
    dataUltimoLogin: Date;
    tipoUsuario: string;
    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
