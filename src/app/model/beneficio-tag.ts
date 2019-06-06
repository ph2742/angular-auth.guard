import { Deserializable } from './deserializable';
import { Base } from './base';
import { Beneficio } from './beneficio';

export class BeneficioTag extends Base implements Deserializable {
    beneficio: Beneficio;
    nome: string;
    tag: BeneficioTag

    deserialize(input: any) {
      // input['display'] = input['display'].substring(0,1).toUpperCase().concat(input['value'].substring(1));
        Object.assign(this, input);
        return this;
    }

    public convertTo(input: any) {
      this.nome = input['display'];
      this.nome = input['value'];

      return this;
    }

    public convertFrom(input: any) {
      this.tag = new BeneficioTag();

      this.tag['value'] = input.nome;
      this.tag['display'] = input.nome;

      return this.tag;
    }
}
