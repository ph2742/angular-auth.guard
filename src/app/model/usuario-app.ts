import { Deserializable } from './deserializable';
import { Usuario } from './usuario';

export class UsuarioApp extends Usuario implements Deserializable {
    tipoCadastro: string; 
    urlFoto: string; 
    cpf: string; 
    celular: string; 
    nascimento: Date;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
