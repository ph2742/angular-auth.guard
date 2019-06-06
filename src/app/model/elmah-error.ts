import { Deserializable } from './deserializable';
import { Base } from './base';

export class ElmahError extends Base implements Deserializable {
    application: string;
    host: string;
    type: string;
    source: string;
    message: string;
    user: string;
    statusCode: number;
    timeUtc: Date;
    sequence: number;
    allXml: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
