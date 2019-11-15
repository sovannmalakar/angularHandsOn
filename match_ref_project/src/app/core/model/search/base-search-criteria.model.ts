export class BaseSearchCriteria {
    page: number;
    pageSize: number;
    keyword: string;
    sortBy: string;
    sortAscending: boolean;
    currentRows: number;
    fromDate?: string;
    toDate?: string;
    totalRowCount: number;
    numericPageCount: number;
}
