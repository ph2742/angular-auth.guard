import { Deserializable } from './deserializable';
import { BaseFilter } from './base-filter';

export class RedeEmpresaFilter extends BaseFilter implements Deserializable {
    name: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
