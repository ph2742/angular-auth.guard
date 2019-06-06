import { PagedList } from './paged-list'

export class PaginateConfig {
    id: string;
    itemsPerPage: number;
    currentPage: number;
    totalItems: number;
    totalPage: number;

    convert(model: PagedList){
        this.totalItems = model.total_count;
        this.currentPage = model.page;
        this.totalPage = model.page_count;
        
        return this;
    }
}
