import { Deserializable } from './deserializable';
import { Base } from './base';
import { Evento } from './evento';

export class EventoTag extends Base implements Deserializable {
    evento: Evento;
    nome: string;
    tag: EventoTag

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public convertTo(input: any) {
      this.nome = input['value'];

      return this;
    }

    public convertFrom(input: any) {
      this.tag = new EventoTag();

      this.tag['value'] = input.nome;
      this.tag['display'] = input.nome;

      return this.tag;
    }
}
