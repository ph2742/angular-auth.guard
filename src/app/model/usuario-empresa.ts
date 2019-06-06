import { Deserializable } from './deserializable';
import { Base } from './base';
import { Empresa } from './empresa';
import { Usuario } from './usuario';

export class UsuarioEmpresa extends Base implements Deserializable {
    empresa: Empresa;
    usuario: Usuario;
        
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
