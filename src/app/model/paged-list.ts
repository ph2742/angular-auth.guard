import { Deserializable } from './deserializable';

export class PagedList implements Deserializable {
    total_count: number;
    page_count: number;
    page: number;
    page_size: number;
    items: any[];
    total_description: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
