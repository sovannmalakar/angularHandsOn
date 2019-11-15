import { IReturnModel } from './i-return.model';

export class ReturnListWithSearchModel<TModel, TSearch> extends IReturnModel {
    model: TModel[];
    search: TSearch;
    activeTab: number;
    totalRecords: number;
    isSuccess: boolean;
    errorHolder: Error;
    httpCode: number;
}

