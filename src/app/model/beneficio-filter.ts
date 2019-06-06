import { Deserializable } from './deserializable';
import { BaseFilter } from './base-filter';
import { Status } from './status';

export class BeneficioFilter extends BaseFilter implements Deserializable {
    status: Status;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
