import { Deserializable } from './deserializable';
import { Base } from './base';

export class Perfil extends Base implements Deserializable {
    nome: string; 
    descricao: string;
    numero: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }    
}
