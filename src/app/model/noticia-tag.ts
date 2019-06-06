import { Deserializable } from './deserializable';
import { Base } from './base';
import { Noticia } from './noticia';

export class NoticiaTag extends Base implements Deserializable {
    noticia: Noticia;
    nome: string;
    tag: NoticiaTag

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

    public convertTo(input: any) {
      this.nome = input['value'];

      return this;
    }

    public convertFrom(input: any) {
      this.tag = new NoticiaTag();

      this.tag['value'] = input.nome;
      this.tag['display'] = input.nome;

      return this.tag;
    }
}
