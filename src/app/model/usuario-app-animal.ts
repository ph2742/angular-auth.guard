import { Deserializable } from './deserializable';
import { Base } from './base';
import { Anexo } from './anexo';
import { AnimalRaca } from './animal-raca';

export class UsuarioAppAnimal extends Base implements Deserializable {
    anexo: Anexo;
    animalRaca: AnimalRaca;
    nome: string;
    tipo: string;
    sexo: string;
    nascimento: Date;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
